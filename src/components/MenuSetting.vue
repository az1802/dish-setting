<!--
 * @Author: your name
 * @Date: 2021-02-02 10:16:00
 * @LastEditTime: 2021-04-16 10:44:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /crawling/Users/zhiyi/Desktop/work/shilai-dishes-setting/src/components/dishesMock.vue
-->
<template>
  <div class="menu-setting-wrapper">
    <div class="operations">
      <a-button type="primary" @click="$router.push({name:'DataAnalysis'})" class="matching-imgs">
        数据分析
      </a-button>
      <a-button type="primary" @click="matchingImgs" :disabled="isMatchingImgs" class="matching-imgs">
        一键配图
      </a-button>
      <a-button type="primary" @click="batchSaveMatchImgs" :disabled="isMatchingImgs" class="save-setting">
        保存
      </a-button>
      <a-button type="primary" @click="cancelMatchImgs" :disabled="isMatchingImgs" class="save-setting">
        取消
      </a-button>
    </div>

    <div class="dish-settin">
      <a-row type="flex">
        <a-col flex="200px">
            菜品目录
        </a-col>
        <a-col flex="auto">
          <dish-table></dish-table>
        </a-col>
      </a-row>

    </div>

    <!-- <div class="dish-setting">
      <div class="title">
        编辑菜品
        <a-button type="primary" @click="saveDishSetting" :disabled="isMatchingImgs" class="save-setting">
          保存菜品设置
        </a-button>
      </div>
      <div class="dish-info">
        <a-form>
          <a-form-item label="菜品名称">
            <span class="ant-form-text" style="min-width:150px">
              {{currentDish.name}}
            </span>
            <a-space :size="10">
              <a-button type="primary" size="small" @click="randomMatchImg" v-show="currentDish&&currentDish.name" class="random-match-imgs-btn">
                随机切换菜品图
              </a-button>
              <a-button type="primary" size="small" @click="showImgMatchDialog" v-show="currentDish&&currentDish.name">
                选择菜品图
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </div> -->
   
  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import {commonComputed,commonMethods} from "@store"
import DishTable from "@components/DishTable"
import API from "@api"
import { DEFAULT_DISH_IMAGEURL } from "@utils/constants.js"
export default {
  name: 'MenuSetting',
  data(){
    return {
      isMatchingImgs:false,
      matchImgList:[],
      selectMatchImageUrl:"",
      imgList:[],
      imgMatchDialogVisible:false

    }
  },
  components:{
    DishTable
  },
  computed:{
    ...commonComputed
  },
  watch:{
    // async imgMatchDialogVisible(nval,oval){
    //   if(nval){
    //     let matchRes = await API.matchFoodImages(this.currentDish.name) || [];
    //     let matchImgsTemp = {}
    //     matchRes.forEach(imgItem => {
    //       matchImgsTemp[imgItem.imageUrl] = imgItem;
    //     });

    //     this.matchImgList = Object.values(matchImgsTemp);
    //   }
    // }
  },
  methods:{
    ...commonMethods,
    async matchingImgs(){
      this.isMatchingImgs = true;
      this.setBatchMatchImgsStatus("MATCHING")
      // 根据未显示的图片进行图片匹配
      let dishes = JSON.parse(JSON.stringify(this.dishes))
      // let noImgDishes = [];
      let matchImgs = []
      // let dishes = this.dishes;
      console.log(dishes)

      for(let i = 0 ; i < dishes.length ; i++){
        let dishList = dishes[i].dishList || [];  
        for(let j = 0 ; j < dishList.length ; j++){
          let dishItem = dishList[j];
          if(!dishItem.imageUrl&&!dishItem.shilaiImageUrl&&dishItem.name || dishItem.shilaiImageUrl === DEFAULT_DISH_IMAGEURL){
            console.log("name-----",dishItem.name)
            let matchRes = await API.matchFoodImages(dishItem.name);
            let imageUrl = matchRes&&matchRes.length!=0&&matchRes[0].imageUrl || DEFAULT_DISH_IMAGEURL;

            dishItem.shilaiImageUrl= imageUrl;
            dishItem.matchImgPreview = true;

            matchImgs.push({
              id:dishItem.id,
              shilaiImageUrl:imageUrl,
              name:dishItem.name
            })
          }
        }
      }
      console.log(matchImgs)
      this.isMatchingImgs = false
      this.matchImgs = matchImgs
      this.initDishes(dishes)
    },
    resetDishShilaiImgUrl(){//一键配图重置

      let dishes = JSON.parse(JSON.stringify(this.dishes))

      dishes.forEach(categoryItem=>{
        categoryItem.dishList&&categoryItem.dishList.forEach(dishItem=>{
          if(dishItem.matchImgPreview){
            dishItem.matchImgPreview = false;
             dishItem.shilaiImageUrl= ""
          }
        })
      })
      this.setBatchMatchImgsStatus("")
      
      this.initDishes(dishes)
    },
    cancelMatchImgs(){
      this.resetDishShilaiImgUrl();
    },
    async getMatchingImgs(dishName){
      let matchRes = await API.matchFoodImages(dishName);
      if(!matchRes || !matchRes.length){
        message.warning('没有查询到匹配的图片');
        return false;
      }
      return matchRes
    },
    async randomMatchImg(){//随机匹配图片
      let dishName = this.currentDish.name;
      let matchRes = await this.getMatchingImgs(dishName);
      if(matchRes){
        let randomNum = Math.floor(Math.random()*matchRes.length)
        let matchImg = {
          dishId:this.currentDish.id,
          shilaiImageUrl:matchRes[randomNum].imageUrl
        };
        this.changeDishItem(matchImg);
      }
    },
    async showImgMatchDialog(){
      this.imgMatchDialogVisible=true;
      let matchRes = await this.getMatchingImgs(this.currentDish.name) || [];
      this.matchImgList = matchRes
    },
    async batchSaveMatchImgs(){

      for(let i = 0 ; i < this.matchImgs.length ; i++ ){
        let temp = this.matchImgs[i];
        console.log(temp.dishId,"--------",temp.shilaiImageUrl)
      }

      console.log("保存的菜品---",this.matchImgs)

      // let matchImgs = [];
      // matchImgs.push({
      //   dishId:this.matchImgs[0].id,
      //   shilaiImageUrl:this.matchImgs[0].shilaiImageUrl
      // })
      if(!this.matchImgs){
        return;
      }
      let matchImgs = JSON.parse(JSON.stringify(this.matchImgs));
      matchImgs = matchImgs.map(imgItem=>{
        return {
          dishId:imgItem.id,
          shilaiImageUrl:imgItem.shilaiImageUrl
        }
      })

      let saveRes1 =  await API.saveFoodImages(matchImgs.slice(0,10),this.merchantId);
      let saveRes2 =  await API.saveFoodImages(matchImgs.slice(10),this.merchantId);

      if(saveRes1&&saveRes2){
        message.success("匹配菜品图保存成功");
      }
      let dishes = await API.getMerchantDishes(this.merchantId);
      this.initDishes(dishes)
      this.setBatchMatchImgsStatus("")
      // 保存成功之后重置
    },

    async saveDishSetting(){ //保存菜品的设置

    },
    async handleImgMatchDialogOk(){
      if(!this.selectMatchImageUrl) return ;

      let matchImg = {
        dishId:this.currentDish.id,
        shilaiImageUrl:this.selectMatchImageUrl
      };
      let saveRes =  await API.saveFoodImages([matchImg],this.merchantId);
      console.log("单个图片保存结果---",saveRes)
      if(saveRes){
        this.imgMatchDialogVisible=false
        this.changeDishItem(matchImg);
        this.selectMatchImageUrl=""
      }

    },
    async handleImgMatchDialogCancel(){
      this.selectMatchImageUrl=""
    },
    selectMatchImg(dishItem){
      this.selectMatchImageUrl = this.selectMatchImageUrl == dishItem.imageUrl ? "" : dishItem.imageUrl 
    }
  }
}
</script>

<style scoped lang="less">
.menu-setting-wrapper{
  padding :12px;
  .operations{
    padding :10px 0px;
    .matching-imgs{
      margin-right : 12px
    }
  }
  .dish-setting{
    .title{
      height :60px;
      line-height: 60px;
      font-size :20px;
    }
  }
  
  
}
</style>