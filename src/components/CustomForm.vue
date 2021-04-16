<template>
  <div class="custom-form-wrapper">
    <!-- <div>form 表单--{{formConfig}}--{{formState}}--{{formItemArr}}</div> -->
    <a-form ref="formRef" :model="formState" :label-col="formConfig.labelCol" :wrapper-col="formConfig.wrapperCol" >
      <a-form-item v-for="(formItem,index) in formItemArr" :label="formItem.label" :key="index" >
        <!-- input -->
        <a-input v-if="formItem.type=='input'" v-model:value="formState[formItem.key]" />
        <!-- textarea -->
        <a-textarea v-if="formItem.type=='textarea'" v-model:value="formState[formItem.key]" />
        <!-- switch -->
        <a-switch  v-else-if="formItem.type=='switch'" v-model:checked="formState[formItem.key]"  />
        <!-- radio-group -->
        <a-radio-group v-else-if="formItem.type=='radio'"  v-model:value="formState[formItem.key]">
          <a-radio :value="radioItem.value" :name="formItem.name" v-for="radioItem in formItem.options">{{radioItem.text}}</a-radio>
        </a-radio-group>
        <!-- checkbox-group -->
        <a-checkbox-group v-else-if="formItem.type=='checkbox'"  v-model:value="formState[formItem.key]" >
          <a-checkbox :value="checkboxItem.value" :name="formItem.name" v-for="checkboxItem in formItem.options">{{checkboxItem.text}}</a-checkbox>
        </a-checkbox-group>
        <!-- 下拉框 -->
        <a-select v-else-if="formItem.type=='select'" v-model:value="formState[formItem.key]" placeholder="请选择">
          <a-select-option :value="optionItem.value" v-for="optionItem in formItem.options">{{optionItem.text}}</a-select-option>
        </a-select>
        <!-- 时间区域选择 -->
        <div class="time-select-wrapper"   v-else-if="formItem.type=='time'">
          <a-time-picker v-model:value="formState[formItem.key][0]" format="HH:mm" />
          <span>-</span>
          <a-time-picker v-model:value="formState[formItem.key][1]" format="HH:mm" />
        </div>
        <!-- 上传 -->
        <a-upload
          v-else-if="formItem.type=='imgUpload'"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          v-model:file-list="formState[formItem.key]"
          multiple
        >
          <div v-if="formState[formItem.key].length < 8">
            <plus-outlined />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>

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
