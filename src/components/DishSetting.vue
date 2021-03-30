<!--
 * @Author: your name
 * @Date: 2021-03-29 16:26:48
 * @LastEditTime: 2021-03-29 16:32:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/components/DishSetting.vue
-->
<template>
  <a-layout-sider class="page-sider" width="460"><DishPreview></DishPreview></a-layout-sider>
  <a-layout-content><MenuSetting></MenuSetting></a-layout-content>
</template>
<script>
import DishPreview from "@components/DishPreview";
import MenuSetting from "@components/MenuSetting";

export default {
  components:{
    DishPreview,
    MenuSetting,
  },
}
</script>