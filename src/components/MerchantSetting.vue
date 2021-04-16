<!--
 * @Author: your name
 * @Date: 2021-03-29 15:56:13
 * @LastEditTime: 2021-03-30 19:18:34
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
import moment from 'moment';
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
    label:"textarea test",
    name:"textarea",//
    key:"textarea",
    type:"textarea",
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
  },{
    label:"time test",
    name:"time",
    key:"time",
    type:"time",
    options:[],
    formItemProps:{

    }
  },{
    label:"uploadImg test",
    name:"uploadTest",
    key:"uploadTest",
    type:"imgUpload",
    options:[],
    formItemProps:{
      
    }
  },{
    label:"radio test",
    name:"radioTest",
    key:"radioTest",
    type:"radio",
    options:[{
      value:"1",
      text:"Online"
    },{
      value:"2",
      text:"offLine"
    },{
      value:"3",
      text:"outLine"
    }],
    formItemProps:{

    }
  },{
    label:"checkbox test",
    name:"type",
    key:"type",
    type:"checkbox",
    options:[{
      value:"1",
      text:"Online"
    },{
      value:"2",
      text:"offLine"
    },{
      value:"3",
      text:"outLine"
    }],
    formItemProps:{

    }
  },
  {
    label:"select test",
    name:"merchantType",
    key:"merchantType",
    type:"select",
    options:[{
      value:"fastFood",
      text:"快餐"
    },{
      value:"b",
      text:"正餐"
    },{
      value:"c",
      text:"小吃"
    }],
    formItemProps:{

    }
  }
]

let formStateDefault = { //表单的初始默认值,以及远程接口获取的初始值
  "enablePaymentReminder": "inpu test",
  "textarea":"textarea test",
  "enableShilaiMemberCardPay": true,
  "time":[moment("09:00","HH:mm"),moment("14:00","HH:mm")],
  "uploadTest":[],
  "radioTest":"2",
  "type" :[ "1"],
  "merchantType":"b"
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
