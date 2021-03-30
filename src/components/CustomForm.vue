<template>
  <div class="custom-form-wrapper">
    <!-- <div>form 表单--{{formConfig}}--{{formState}}--{{formItemArr}}</div> -->
    <a-form ref="formRef" :model="formState" :label-col="formConfig.labelCol" :wrapper-col="formConfig.wrapperCol" >
      <a-form-item v-for="(formItem,index) in formItemArr" :label="formItem.label" :key="index" >
        <a-input v-if="formItem.type=='input'" v-model:value="formState[formItem.key]" />
        <a-switch  v-if="formItem.type=='switch'" v-model:checked="formState[formItem.key]"  />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
  
</template>
<script>
import { Moment } from 'moment';
import { defineComponent, reactive, toRaw, toRefs, UnwrapRef ,ref} from 'vue';

export default defineComponent({
  props:{
    formConfig:{
      type:Object
    },
    formState:{
      type:Object
    },
    formItemArr:{
      type:Array
    },

  },
  setup(props) {//根据props配置进行form表单的生成
    
    let {formConfig,formState,formItemArr} = toRefs(props)
    console.log(props)
    // formProps,表单的属性 
    // fromState,
    // fromItemArr:[{
    // label name  options
    // }]
    // 针对不同类型的插槽部分处理
    // onSumbit事件

    let formRef = ref();
    

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState));
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      console.log("formRef.value---",formRef.value)
      formRef.value.resetFields();
    };


    return {
      formRef,
      onSubmit,
      resetForm
    };
  },
});
</script>
