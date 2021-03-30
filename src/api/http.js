import axios from "axios";
import router from "../router/index"
import { message } from 'ant-design-vue';


const versions = "v2.33";
const BUILD_ENV = "https://shilai.zhiyi.cn/";
const TEST_ENV = "https://test.shilai.zhiyi.cn"
const H5_ENV="http://shilai-h5.zhiyi.cn"

const instance = axios.create({
  // baseURL: `${BUILD_ENV}/${versions}`,
  // baseURL:TEST_ENV,
  // baseURL: BUILD_ENV,
  baseURL: H5_ENV,
  headers: {
    // userId:"d4848915-b103-4e1a-abfd-a04886fa61e6"
    // "Access-Control-Allow-Origin":"*"
  }
});
// 请求拦截器,设置头部sessionId
instance.interceptors.request.use(config => {
  let sessionId = window.localStorage.getItem("shilai-sessionId");
  if (sessionId) { //
    config.headers.session = sessionId;
  }
  if (config.url.indexOf("web-login") == -1 && !sessionId) { //重定向到登录页面
    message.info('请先登录');
    setTimeout(() => router.replace("/login"),1500)
  }
  // console.log("请求拦截器---",config)
  return config
}, err => {
  return Promise.reject(err)
})

// 处理返回的数据格式
instance.interceptors.response.use(res => {
  // console.log("响应拦截器---",res)
  if (res.status == 200) {
    if (res.data && res.data.errcode == 0) {//数据请求成功
      return res.data.data
    } else if (res.data && res.data.errcode == 1000) {//session过去需要重新登录
      message.info('会话过期,请重新登录');
      setTimeout(() => router.replace("/login"),1500)
    }
  }
  return false;
}, err => {
  console.error(err)
  return false
})

export default instance