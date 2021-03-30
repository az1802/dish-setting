<!--
 * @Author: your name
 * @Date: 2021-03-29 15:56:13
 * @LastEditTime: 2021-03-30 15:18:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/MerchantSetting.vue
-->
<template>
  <div class="merchant-setting-wrapper">
    商户信息设置
    <div>{{formState}}</div>
    <custom-form :formConfig="formConfig" :formState="formState" :formItemArr="formItemArr"></custom-form>
  </div>
</template>
<script>
import CustomForm from "@components/CustomForm"
import {reactive} from "vue"

let formConfigDefault={
  labelCol:{span:10}, //label标签布局
  wrapperCol:{span:10},//输入控件的布局
  layout:"",//表单布局
  rules:{ //所有字段的校验详情

  }
}

// 按照这个顺序显示表单
let formItemArrDefault = [
  {
    label:"input test",
    name:"enablePaymentReminder",//
    key:"enablePaymentReminder",
    type:"input",
    options:[],
    formItemProps:{

    }
  },{
    label:"switch test",
    name:"enableShilaiMemberCardPay",
    key:"enableShilaiMemberCardPay",
    type:"switch",
    options:[],
    formItemProps:{

    }
  }
]

let formStateDefault = { //表单的初始默认值,以及远程接口获取的初始值
  "enablePaymentReminder": false,
  "enableShilaiMemberCardPay": true,
}
export default {
  components:{
    CustomForm
  },
  setup(){

    let formState = reactive(formStateDefault);
    let formConfig = reactive(formConfigDefault);
    let formItemArr = reactive(formItemArrDefault);


    return {
      formState,
      formConfig,
      formItemArr
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>
