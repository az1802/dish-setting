<!--
 * @Author: your name
 * @Date: 2021-03-18 11:10:31
 * @LastEditTime: 2021-04-16 14:18:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shilai-dishes-setting/src/pages/login.vue
-->
<template>
  <div class="login-wrapper">
    <div class="title">时来菜单管理系统</div>
    <a-form
      class="login-form-wrapper"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item>
        <a-input v-model:value="formState.username" placeholder="用户名">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-model:value="formState.passwd"
          type="password"
          placeholder="Password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.username === '' || formState.passwd === ''"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import API from "@api"
import { message } from 'ant-design-vue';
export default {
  data() {
    return {
      formState:{
        // username:"",
        // passwd:"",
        username:"",
        passwd:""
      }
    }
  },
  
  methods:{
    async handleFinish(){
      console.log("sumbit")
      await this.login(this.formState)
    },
    handleFinishFailed(){
      console.log("sumbit error")
    },
    async login(formState){
 
      let res = await  API.login(formState);
      if(res){ //登录成功跳转到首页
         this.$router.push({name:"dishSetting"})
      }else{//账号密码错误
        message.info('账号密码错误,请重新登录');
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login-wrapper{
  width:500px;
  margin : 200px auto  0;
  
  .title{
    font-size : 26px;
    font-weight : bold;
    height : 100px;
    line-height: 100px;
  }
  .login-form-wrapper{
    display:inline-block;
  }
  
}
</style>