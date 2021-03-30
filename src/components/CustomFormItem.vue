<!--
 * @Author: your name
 * @Date: 2021-03-30 11:21:06
 * @LastEditTime: 2021-03-30 11:21:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/CustomFormItem.vue
-->
<template>
  <div class="custom-form-item">
    <a-form-item :label="formProps.label" :name="">
    </a-form-item>
  </div>
</template>
<script>
export default {
  props:{
    key:{
      type:String,
      default:""
    },
    formProps:{
      type:Object,
      default:{
        label:"",

      }
    },
    formState:{
      type:Object,
      default:{

      }
    }
  },
  setup(props){


  }
}
</script>
<style lang="less" scoped>
  
</style>