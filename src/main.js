import { createApp } from 'vue'
import Antd ,{ Modal } from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import addFilters from './vue-filters'
import moment from 'moment';
import { commonComputed, commonMethods } from "@store"
import MerchantList from "@components/MerchantList"

import 'ant-design-vue/dist/antd.css';


moment.locale('zh-cn');//设置日期选择格式为中文

let app = createApp(App);
app.config.productionTip = false;
addFilters(app)
app.use(Antd);
app.use(Modal)
app.mixin({
  components: {
    MerchantList
  },
  methods:{
    ...commonMethods
  },
  computed:{
    ...commonComputed
  },
})

app.use(store).use(router).mount('#app')
