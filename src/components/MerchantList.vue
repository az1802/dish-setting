<!--
 * @Author: your name
 * @Date: 2021-03-23 11:53:23
 * @LastEditTime: 2021-03-24 11:52:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/MerchantList.vue
-->
<template>
  <div class="merchant-list-wrapper">
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
</template>
<script>
import { defineComponent, h, reactive ,ref} from 'vue';
import API from "@api"

function filterOption(input,option){
  return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export default defineComponent({
  name:"MerchantList",
  props:{
    value:{
      type:String,
      default:""
    }
  },
  setup(props){
    let merchantList = reactive([]);
    let merchantVal  = ref(props.value);

    console.log("merchantVal----",merchantVal)
    function filterOption(input,option){
      return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    API.getMerchantList().then(res=>{
      res&&merchantList.splice(0,merchantList.length,...res)
    });

    return {
      merchantVal,
      merchantList,
      filterOption,
    }
  },
  methods:{
    handleChange(value){
      this.merchantVal = value;
      this.$emit("update:value", this.merchantVal)
    }
  }
 
})
</script>
<style lang="less" scoped>
  .merchant-list-wrapper{
    display: inline-block;
  }
</style>
