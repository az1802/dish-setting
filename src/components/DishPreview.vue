<!--
 * @Author: your name
 * @Date: 2021-02-02 10:16:00
 * @LastEditTime: 2021-02-22 16:18:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /crawling/Users/zhiyi/Desktop/work/shilai-dishes-setting/src/components/dishesMock.vue
-->
<template>
  <div class="mobile-wrapper">
    <div class="menu-wrapper">
        <div class="category-item" :class='[index==currentCategory ? "active" : ""]' v-for="(categoryItem,index) in dishes" :key="categoryItem.id" @click='changeCategory(index)' >
            {{categoryItem.category.name}}
        </div>
    </div>   
    <div class="dishes-wrapper" ref="dishesWrapperDom" @scroll="handleDishScroll($event)">
      <div class="category-item" v-for="categoryItem in dishes" :key="categoryItem.id" >
        <div class="category-title">
           {{categoryItem.category.name}}
        </div>
        <div v-for="dishItem in categoryItem.dishList" :key="dishItem.id" class="dish-item-wrapper" @click="changeCurrentDish(dishItem)" :class="dishItem.id == currentDish.id ? 'active' : ''" v-show="(batchMatchImgsStatus!=='MATCHING' ||  batchMatchImgsStatus=='MATCHING'&&dishItem.matchImgPreview)" >
          <img :src="dishItem.imageUrl || dishItem.shilaiImageUrl" class="img"  />
          <div class="dish-item">
            <div class="name"> {{$filters.foodName(dishItem.name)}}</div>
            <div class="dish-info">
              <div class="dish-price">{{$filters.normalizePrice(dishItem.price)}}</div>
            </div>
          </div>
          <a-tag color="#2db7f5" class="tag" v-if="dishItem.imageUrl">
            客如云
          </a-tag>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import {commonComputed,commonMethods} from "@store"
export default {
  name: 'DishPreview',
  computed:{
    ...commonComputed
  },
  data(){
    return {
      currentCategory:0,
      dishScroll:false,
      timeId:"",
    }
  },
  watch:{
    currentCategory(nval,oval){
      if( this.dishScroll){
        this.dishScroll=false;
      }
      console.log("菜单变动")
      let dishWrapperDom = this.$refs.dishesWrapperDom;
      // debugger;
      let categoryItemDoms = dishWrapperDom.children
      let scrollTop = 0;
      for(let i = 0 ; i < nval ;i++){
        scrollTop+=categoryItemDoms[i].getClientRects()[0].height
        scrollTop+=20 //底部目录的margin间距
      };
      dishWrapperDom.scrollTop = scrollTop
    }
  },
  methods:{
    ...commonMethods,
    changeCategory(index){
      console.log(index);
      this.currentCategory = index;
    },
    changeDish(dish){
      this.changeCurrentDish(dish)
    },
    handleDishScroll(e){
      if(this.timeId){
        clearTimeout(this.timeId);
      }else{
        this.timeId = setTimeout(()=>{
          let dishWrapperDom = this.$refs.dishesWrapperDom;
          let scrollTop =  dishWrapperDom.scrollTop;
          for(let i = 0 ;  i  < this.scrollTopArr.length ; i++){
            if(scrollTop <= this.scrollTopArr[i]){
              this.dishScroll = true;
              this.currentCategory = i;
              break;
            }
          }
        },500)
      }
      
    }
  },

  created(){
    console.log(this.dishes)
  },
  mounted(){
    let dishWrapperDom = this.$refs.dishesWrapperDom;
    // debugger;
    let categoryItemDoms = dishWrapperDom.children
    let scrollTop = 0,scrollTopArr = [0];

    for(let i = 0 ; i < categoryItemDoms.length ;i++){
      scrollTop+=categoryItemDoms[i].getClientRects()[0].height
      scrollTop+=20 //底部目录的margin间距
      scrollTopArr.push(scrollTop)
    };
    this.scrollTopArr = scrollTopArr;
  }
}
</script>

<style scoped lang="less">
  .mobile-wrapper{
    width : 375px;
    height : 667px;
    padding:20px 0;
    border-radius: 20px;
    background-color: white;
    margin : 0 auto ;
    display :flex;
    color : black;
    line-height: 1;
    .menu-wrapper{
      flex-basis:80px;
      height: 100%;
      overflow :auto;
      background-color : #f8f8f8;
      color : #333333;
      .category-item{
        height : 46px;
        line-height: 46px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width : 100%;
        border-bottom : 2px solid transparent;
        font-size:14px;
        &.active{
          background-color : white;
          color :#eb4b3a;
          font-weight: bolder;
          border-bottom : 2px solid #eb4b3a
        }
      }
    }
    .dishes-wrapper{
      flex : 1 ;
      height: 100%;
      overflow :auto;
      .category-item{
        .category-title{
          font-size : 16px;
          text-align:left;
          height:22px;
          line-height: 22px;
        }
        .dish-item-wrapper{
          display:  flex;
          margin-bottom: 20px;
          position:relative;
          .tag{
            position: absolute;
            right : 0;
            top : 0;
          }
          &.active{
            background-color: #cccccc;
          }
          .img{
            flex-basis: 60px;
            width:60px;
            height: 60px;
            border-radius: 4px;
            background-color: #cccccc;
            // &.matchImg{
            //   border : 1px solid #eb4b3a
            // }
          }

          .dish-item{
            flex : 1;
            font-size : 16px;
            text-align:left;
            height :60px;
            display: flex;
            flex-direction: column;
            margin-left: 12px;
            justify-content: space-between;
            .name{
              font-size : 16px;
              font-weight: bold;
            }
            .dish-price{
              color : #eb4b3a;
              font-size : 16px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
    
</style>