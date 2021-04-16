<!--
 * @Author: your name
 * @Date: 2021-02-19 17:11:03
 * @LastEditTime: 2021-04-16 10:29:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/SystemHeader.vue
-->
<template>
<div class="header-wrapper">
  时来菜单管理系统
  <div style='display:inline-block'>
    <router-link :to="{name:'merchantSetting',params:{}}">商户配置</router-link>
    <router-link :to="{name:'dishSetting',params:{}}">菜单管理</router-link>
  </div>
  <div class="merchant-select-wrapper">
    <span class="select-label">选择商户</span>
    <a-select
      v-model:value="merchantVal"
      show-search
      placeholder="选择一个商户"
      option-filter-prop="children"
      style="width: 200px"
      :filter-option="filterOption"
      @change="handleChange"
    >
      <a-select-option v-for="merchantItem in merchantList" :key="merchantItem.id" :title="merchantItem.name" :value="merchantItem.id">{{merchantItem.name}}</a-select-option>
    </a-select>
  </div>
</div>
</template>
<script>
import API from "@api"
import {commonComputed,commonMethods} from "@store"
export default {
  name: 'SystemHeader',
  data(){
    return {
      merchantVal:"",
      merchantList:[],
    }
  },
  computed:{
    ...commonComputed
  },
  async beforeCreate(){
    // 请求所有商户信息
    let res = await API.getMerchantList();
    this.merchantList = res || [];
  },
  methods:{
    ...commonMethods,
    async handleChange(value){
      // value="dd7e0b247d074c2883a969ac05b34c18"
      this.merchantVal = value;
      this.changeMerchantId(value)
      this.setBatchMatchImgsStatus(false)
    },
    filterOption(input,option){
      return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  }
}
</script>
<style scoped lang="less">
.header-wrapper{
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  .merchant-select-wrapper{
    float:right;
    .select-label{
      font-size : 16px;
      font-weight: 400;
      margin-right: 12px;
    }
  }
}

</style>