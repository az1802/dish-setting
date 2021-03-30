<!--
 * @Author: your name
 * @Date: 2021-03-22 11:36:40
 * @LastEditTime: 2021-03-29 16:31:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/views/Home.vue
-->
<template>
  <div id="page-wrapper">
    <a-layout class="page-layout">
      <a-layout-header>
        <SystemHeader></SystemHeader>
      </a-layout-header>
      <a-layout class="page-content">
        <router-view class="view two" >
         
        </router-view>
      </a-layout>
      <a-layout-footer>时来饭票菜单管理系统</a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import SystemHeader from "@components/SystemHeader"
import API from "@api" 
import {formatDishes} from "@utils/index.js"
import {commonComputed,commonMethods} from "@store"


export default {
  name: 'Home',
  props: {
    msg: String
  },
  components:{
    SystemHeader,
  },
  computed:{
    ...commonComputed
  },
  methods:{
    ...commonMethods,
    
  },
  beforeCreate() {
    API.getRecord();
  },
  async created(){
    let dishes = await API.getMerchantDishes(this.merchantId) || [];
    console.log("dishes---",dishes)
    this.initDishes(dishes)
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page-wrapper {
  text-align: center;
}
#page-wrapper .ant-layout-header,
#page-wrapper .ant-layout-footer {
  background: white;
  color: black;
}
#page-wrapper .ant-layout-footer {
  line-height: 1.5;
}
#page-wrapper .ant-layout-sider {
  background: #555555;
  color:#fff;
  line-height: 120px;
}
#page-wrapper .ant-layout-content {
  background:#f8f8f8;
  color: black;
  text-align: left;
  // min-height: 120px;
  // line-height: 120px;
}
#page-wrapper > .ant-layout {
  margin-bottom: 48px;
}
#page-wrapper > .ant-layout:last-child {
  margin: 0;
}

.page-layout {
  height:100vh;
  .page-content{
    min-height:800px;
    .page-sider{
      // width : 460px;
      box-sizing: border-box;
      padding: 40px 20px;
    }
  }
}
.img-match-dialog-wrapper{
    .img-match-dialog-content{
      .img-match-item{
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        width:100px;
        text-align: center;
        cursor: pointer;
        &.active{
          .img-wrapper{
            .img{
              border : 1px solid #eb4b3a
            }
          }
        }
        .img-wrapper{
          .img{
            width: 60px;
            height :60px;
            border : 1px solid #cccccc;
            border-radius: 4px;
          }
        }
        .name{
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
