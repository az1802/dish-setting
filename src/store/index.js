import { createStore } from 'vuex'
import { mapGetters, mapActions } from 'vuex'
import { formatDishes} from "../utils/index"
import API from "@api"
export default createStore({
  state: {
    dishes: [],
    merchantInfo: {},
    currentDish: {},
    merchantId: "",
    batchMatchImgsStatus: false,
    spiningConfig: {
      title: "",
      show:false
    }
  },
  getters: {
    dishList(state) { 
      let res = [];
      state.dishes.forEach(categoryItem => { 
        let categoryInfo = categoryItem.category;
        categoryItem.dishList.forEach(dishItem => { 
          res.push(Object.assign({}, dishItem, {
            categoryName : categoryInfo.name,
            categoryInfo : JSON.parse(JSON.stringify(categoryInfo))
          }))
        })
      })

      return res;
    },
    dishes(state) { 
      return state.dishes
    },
    merchantInfo(state) {
      return state.merchantInfo
    },
    currentDish(state) { 
      return state.currentDish
    },
    merchantId(state) { 
      return state.merchantId
    },
    batchMatchImgsStatus(state) { 
      return state.batchMatchImgsStatus
    },
    spiningConfig(state) {
      return state.spiningConfig
    }
  },
  mutations: {
    INIT_DISHES(state,dishes) { 
      state.dishes = dishes;
    },
    CHANGE_CURRENT_DISH(state,dish) { 
      state.currentDish = dish;
    },
    async CHANGE_MERCHANT_ID(state,merchantId) { 
      state.merchantId = merchantId;
      // 更新商户id之后更新菜品数据
      let dishes = await API.getMerchantDishes(merchantId);
      state.dishes = dishes;
    },
    CHANGE_DISH_ITEM(state,dishInfo) {
      // debugger;
      state.dishes.forEach(categoryItem => { 
        let dishList = categoryItem.dishList || [];
        dishList.forEach((dishItem, index) => {
          if (dishItem.id === dishInfo.dishId) { 
            dishList[index] = Object.assign(dishItem, dishInfo)
          }
        })
      })

      // console.log("dishes----",state.dishes)
    },
    SET_BATCH_MATCH_IMGS_STATUS(state,status) { 
      state.batchMatchImgsStatus = status
    },
    SET_SPINING_CONFIG(state,spiningConfig) {
      state.spiningConfig = spiningConfig;
    }
  },
  actions: {
    initDishes({ commit},dishes) {
      commit('INIT_DISHES', dishes)
    },
    changeCurrentDish({ commit},dish) { 
      commit('CHANGE_CURRENT_DISH', dish)
    },
    changeMerchantId({ commit},merchantId) { 
      commit('CHANGE_MERCHANT_ID', merchantId)
    },
    changeDishItem({ commit},dishInfo) { 
      commit('CHANGE_DISH_ITEM', dishInfo)
    },
    setBatchMatchImgsStatus({ commit},status) { 
      commit('SET_BATCH_MATCH_IMGS_STATUS',status)
    },
    setSpiningConfig({ commit},spiningConfig) {
      commit('SET_SPINING_CONFIG',spiningConfig)
    }
  },
})



export const commonComputed = {
  ...mapGetters([
    "dishes",
    "merchantInfo",
    "currentDish",
    "merchantId",
    "batchMatchImgsStatus",
    "dishList",
    "spiningConfig"
  ])
}

export const commonMethods = {
  ...mapActions( [
    "initDishes",
    "changeCurrentDish",
    "changeMerchantId",
    "changeDishItem",
    "setBatchMatchImgsStatus",
    "setSpiningConfig"
  ])
}
