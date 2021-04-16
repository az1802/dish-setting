<!--
 * @Author: your name
 * @Date: 2021-02-23 10:20:20
 * @LastEditTime: 2021-04-16 14:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/DishTable.vue
-->
<template>
  <div class="dish-table-wrapper">
     <a-table :dataSource="dataSource" :columns="columns" bordered :scroll="{ x: 1300 }">
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>

      <template v-for="col in ['name','categoryName','type','price',]" #[col]="{ text, record }" :key="col">
        <div class="editable-row-operations">
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][col]"
            style="margin: -5px 0"
          />
          <div v-else class="td-content-wrapper">
            <a-tag color="#2db7f5" class="tag" v-if="record.imageUrl&&col==='name'">
              客如云
            </a-tag>
            {{ text }}
          </div>
        </div>
      </template>
      <template #imageUrl="{ record,text }">
        <div class="image-url-wrapper">
          <img :src="record.imageUrl || record.shilaiImageUrl" alt="" class="img">
          <div class="image-url-operation">
            <a-button type="primary" size="small" class="btn" @click="uploadDishImage(record)">上传</a-button>
            <a-button type="primary" size="small" class="btn" @click="selectDishIamge(record)">换图</a-button>
          </div>
        </div>
      </template>
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a @click="save(record.key)">保存</a>
            <a-popconfirm title="确定取消?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">编辑</a>
          </span>
        </div>
      </template>
     </a-table>

    <a-modal v-model:visible="imgMatchDialogVisible" title="选择菜品图片" @ok="handleImgMatchDialogOk" dialogClass="img-match-dialog-wrapper" @cancel="handleImgMatchDialogCancel">
      <div class="img-match-dialog-content">
        <div v-for="(dishItem,index) in matchImgList" :key="index" class="img-match-item" @click="selectMatchImg(dishItem)" :class="selectMatchImageUrl==dishItem.imageUrl ? 'active' : ''">
          <div class="img-wrapper"><img :src="dishItem.imageUrl" alt="" class="img"></div>
          <div class="name">{{dishItem.name}}</div>
        </div>
        <a-empty v-show="matchImgList.length==0"/>
      </div>
    </a-modal>

    <!--上传成功且可以预览图片-->
    <a-modal v-model:visible="uploadDialogVisible" title="上传图片 " @ok="handleImgUpLoadDialogOk" dialogClass="img-match-dialog-wrapper" @cancel="handleImgUploadCancel">
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        list-type="picture"
        :multiple="false"
        action="http://shilai-h5.zhiyi.cn/staff-assist/misc/image/upload"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击或者拖动到此区域上传</p>
        <p class="ant-upload-hint">
          Support for a single upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </a-upload-dragger>
    </a-modal>


  </div>
</template>
<script>
import { message } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import {commonComputed,commonMethods} from "@store"
import {cloneDeep} from 'lodash-es'
import API from '@api'
const columns = [
          {
            title: '菜品名称',
            dataIndex: 'name',
            key: 'name',
            width : "200px",
            // fixed:"left",
            slots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'name',
            },
            onFilter: (value, record) =>
              record.name.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible,...resets) => {
              if (visible) {
                setTimeout(() => {
                  console.log(resets)
                }, 0);
              }
            },
          },
          {
            title: '图片',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width : "150px",
            slots: { customRender: 'imageUrl' },
          },
          {
            title: '所属分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width : "150px",
            slots: { customRender: 'categoryName' },
          },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width : "150px",
            slots: { customRender: 'type' },
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width : "150px",
            slots: { customRender: 'price' },
          },
          {
            title: '操作',
            dataIndex: 'operation',
            slots: { customRender: 'operation' },
            // fixed:"right"
          },
      ];
export default {
  data(){
    return {
      editableData:{},
      selectMatchImageUrl:"",
      imgMatchDialogVisible:false,
      uploadDialogVisible:false,
      matchImgList:[],
      selectDish:{},
      searchText:"",
      searchedColumn:"",
      fileList:[],

    }
  },
  created(){
    this.columns = columns;
  },
  components:{
    SearchOutlined
  },
  computed:{
    ...commonComputed,
    dataSource(){
      
      let tableData = this.dishList.map(dishItem=>{
        return {
          name:dishItem.name,
          id:dishItem.id,
          key:dishItem.id,
          imageUrl:dishItem.imageUrl,
          shilaiImageUrl:dishItem.shilaiImageUrl,
          categoryName:dishItem.categoryName,
          price:dishItem.price
        }
      })
      return tableData
    },
    
  },
  methods : {
    ...commonMethods,
    edit(key){
      console.log(this.dataSource,key)
      this.editableData[key] = cloneDeep(this.dataSource.filter(item => key === item.key)[0]);
    },
    save(key){
      Object.assign(this.dataSource.filter(item => key === item.key)[0], this.editableData[key]);
      delete this.editableData[key];
    },
    cancel(key){
      delete this.editableData[key];
    },
    async getMatchingImgs(dishName){
      let matchRes = await API.matchFoodImages(dishName);
      if(!matchRes || !matchRes.length){
        message.warning('没有查询到匹配的图片');
        return false;
      }
      return matchRes
    },
    // async randomMatchImg(record){//随机匹配图片
    //   let dishName = record.name;
    //   let matchRes = await this.getMatchingImgs(dishName);
    //   if(matchRes){
    //     let randomNum = Math.floor(Math.random()*matchRes.length)
    //     let matchImg = {
    //       dishId:record.id,
    //       shilaiImageUrl:matchRes[randomNum].imageUrl
    //     };
    //     let saveRes = await API.saveFoodImages([matchImg],this.merchantId);
    //     if(saveRes){
    //       this.changeDishItem(matchImg);
    //     }
       
    //   }
    // },
    async selectDishIamge(record){
      this.imgMatchDialogVisible = true;
      this.selectDish = JSON.parse(JSON.stringify(record));
      this.matchImgList = await this.getMatchingImgs(this.selectDish.name) || [];
    },
    async uploadDishImage(record){
      this.fileList = [];
      this.uploadDialogVisible = true;
      this.selectDish = JSON.parse(JSON.stringify(record));
      // message.warning('功能开发中敬请期待');
    },
    async handleImgMatchDialogOk(){
      if(!this.selectMatchImageUrl) return ;

      let matchImg = {
        dishId:this.selectDish.id,
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
    async handleImgUpLoadDialogOk(){ //上传图片ok
      // TODO 自定义上传图片
      let fileList = this.fileList;
      console.log("fileList----",fileList)
      let fileItem = fileList&&fileList[0];
      if(!fileItem || !fileItem.response || (fileItem.response.errcode!=0) || !fileItem.response.data.imageUrl){
        return 
      }
      let imageUrl = fileItem.response.data.imageUrl;
      this.selectDish&&(this.selectDish.shilaiImageUrl = imageUrl);

      let matchImg = {
        dishId:this.selectDish.id,
        shilaiImageUrl:this.selectDish.shilaiImageUrl
      };
      let saveRes =  await API.saveFoodImages([matchImg],this.merchantId);
      console.log("单个图片保存结果---",saveRes)

      if(saveRes){
        message.success(`菜品图片更新成功`);
        this.changeDishItem(matchImg);
      }

      this.uploadDialogVisible = false;
    },
    async handleImgUploadCancel(){
      this.uploadDialogVisible = false;
    },
    handleChange(info){//处理图片拖拽上传
      const status = info.file.status;
      if (status !== '正在上传中') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    selectMatchImg(dishItem){
      this.selectMatchImageUrl = this.selectMatchImageUrl == dishItem.imageUrl ? "" : dishItem.imageUrl 
    },

    handleSearch(selectedKeys, confirm, dataIndex){
      confirm();
      console.log(selectedKeys[0]);
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
     handleReset(clearFilters){
      clearFilters();
      this.searchText = '';
    },
  }
}
</script>
<style lang="less" scoped>
.dish-table-wrapper{
  .editable-row-operations a{
    margin-right: 8px;
  }
  .editable-row-operations {
    .td-content-wrapper{
      position: relative;
      .tag{
        position: absolute;
        left :-17px;
        top:-36px;
      }
    }
  }
  
  .image-url-wrapper{
    display: flex;
    .img{
      flex-basis: 60px;
      width : 60px;
      height: 60px;
      border-radius: 2px;
    }
    .image-url-operation{
      margin-left:12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}

</style>