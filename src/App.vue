<!--
 * @Author: your name
 * @Date: 2021-02-01 18:58:22
 * @LastEditTime: 2021-03-24 11:41:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/App.vue
-->
<template>
  <div id="nav">
    <router-link to="/login"></router-link>
    <router-link to="/"></router-link>
    <router-link to="/dataAnalysis"></router-link>
  </div>
  <router-view/>
  <a-spin size="large"  :spinning="spiningConfig.show" :tip="spiningConfig.title" class="spining">
  </a-spin >
</template>
<script>
// import MerchantList from "@components/MerchantList"
export default {
  // components:{
  //   MerchantList
  // }
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

#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.spining{
  position: fixed;
  top : 50%;
  left : 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
}
</style>
