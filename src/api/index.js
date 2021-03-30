import urls from "./urls"; //请求连接
import http from "./http"
import md5 from "js-md5"

import { formatDishes } from "../utils/index" 

export default {

  getMerchantDishes(merchantId) {
    let url = urls.GET_MERCHANT_DISHES;
    if (!merchantId) {
      return 
    }
    return http.get(`${url}/${merchantId}`, {
      params: {
        mealType:"SELF_PICK_UP"
      },
    }).then(res => {
      return res ? formatDishes(res.dishes || []) : [];
    })
  },

  matchFoodImages(foodName) { 
    let url = urls.MATCH_FOOD_IMAGE;
    if (!foodName) {
      return false;
    } else { 
      let dishMatchImgs = {};
      try {
        dishMatchImgs = JSON.parse(sessionStorage.getItem("dishMatchImgs") || '{}')
      } catch (err) { 
        dishMatchImgs = {}
      }
      // console.log(dishMatchImgs[foodName])
      if (dishMatchImgs[foodName]) { 
        return dishMatchImgs[foodName]
      }

      return http.get(url, {
        params: {
          dishName:foodName
        }
      }).then(res => { 
        if (res && res.list) {
          // 针对查询结果进行去重,同时做本地会话缓存
          let matchImgsTemp = {},matchRes = []
          res.list.forEach(imgItem => {
            matchImgsTemp[imgItem.imageUrl] = imgItem;
          });

          matchRes = Object.values(matchImgsTemp);

          if (matchRes&&matchRes.length > 0){  //匹配结果进行缓存
            dishMatchImgs[foodName] = matchRes;
            sessionStorage.setItem("dishMatchImgs",JSON.stringify(dishMatchImgs))
          }
          return matchRes
        }
        return false
      })
    }
  },

  saveFoodImages(foods,merchantId) { 
    let url = urls.SAVE_FOOD_IMAGE;
    return http.post(`${url}/${merchantId}`, {
      dishes:foods
    }).then(res => { 
      
      return res
    })
  },

  getMerchantList() { 
    let url = urls.MERCHANT_LIST;
    return http.get(url, {
    }).then(res => { 
      return res.list || []
    })
  },

  getRecord() {
    let url = urls.GET_SECORD;
    return http.get(url, {}).then(res => {
      console.log(res)
    })
  },

  // 获取埋点数据分析的结果
  getDataAnalysis(times, merchantId) {
    let [startDate, endDate] = times;
    // startDate = "2021-03-19 10:00", endDate = "2021-03-20 10:00";

    let url = `${urls.GET_DATA_ANALYSIS}${merchantId ? '/'+merchantId: ""}`;
    return http.get(url, {
      params: {
        startDate,
        endDate
      }
    }).then(res => {
       return res
    })
  },

  // 登录 返回的session作为headers值
  login({ username, passwd }) {
    passwd = md5(passwd)
    let url = urls.WEB_LOGIN;
    return http.post(url, {
        username,
        passwd
    }).then(res => {
      let { session } = res
      window.localStorage.setItem("shilai-sessionId", session);
      return !!session
    })
  }
  
}