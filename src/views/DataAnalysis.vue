<template>
  <div class="data-analysis-wrapper">
    <div class="title">用户埋点信息统计</div>
    <div class="time-select-wrapper">
      <merchant-list v-model:value="merchantVal"></merchant-list>
      <!-- <a-select
        v-model:value="merchantVal"
        show-search
        placeholder="选择一个商户"
        option-filter-prop="children"
        style="width: 200px"
        class="merchant-slect"
        allowClear
      
        :filter-option="filterOption"
        @change="handleChange"
      >
        <a-select-option v-for="merchantItem in merchantList" :key="merchantItem.id" :title="merchantItem.name" :value="merchantItem.id">{{merchantItem.name}}</a-select-option>
      </a-select> -->
      <a-range-picker
        :show-time="{ format: 'HH' }"
        format="YYYY-MM-DD HH"
        :locale="locale"
        :placeholder="['开始时间', '截止时间']"
        valueFormat="YYYY-MM-DD HH"
        @change="onChange"
        @ok="onOk"

      />
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="tableDatas" bordered>
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script >
import { defineComponent, h, reactive ,ref} from 'vue';
import { message } from 'ant-design-vue';

import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import API from "@api"

const renderContent = ({ text, index }) => {
  const obj = {
    children: text,
    props: {},
  };
  return obj;
};

async function getBuryingPointData(time,merchantId){
  let dataRes = await API.getDataAnalysis(time,merchantId) || {};
   console.log("dataRes-----",dataRes)
  let tableDatas = formateDatas(dataRes)
  
  return tableDatas || [];
}

function formateTime(time){
  let hour = 0 , min = 0,millSecond = time/1000;
  min = parseInt((millSecond/60)%60);
  hour = parseInt(millSecond/(60*60))
  millSecond = parseInt(millSecond%60)

  return `${min}min${millSecond}s`

}

function formateDatas(data = {}){
  let res = [];
  let keySort = ["fanpiaoOpenScreen","fanpiaoBannerDetails","fanpiaoPayOrder","fanpiaoMerchantHome","couponPackageBanner","couponPackageMergePay","couponPackageMerchantHome","activityBanner","activityRedPacket"];
  let keyMap = {
    "fanpiaoOpenScreen" : "开屏页",
    "fanpiaoBannerDetails" : "banner详情页",
    "fanpiaoPayOrder":"支付页入口",
    "fanpiaoMerchantHome":"商户首页",
    "couponPackageBanner":"banner",
    "couponPackageMergePay":"订单合并支付",
    "couponPackageMerchantHome":"商户首页",
    "activityBanner":"banner",
    "activityRedPacket":"红包弹窗"
  }
  for(let i = 0 ; i < keySort.length ; i++){
    let dataTemp = data[keySort[i]] || {};
    let tempData = {};
    if(keySort[i].indexOf("activity")==-1){
      tempData = {
        "name":keyMap[keySort[i]],
        "accessCount": dataTemp.accessCount || 0,
        "userAccessCount": dataTemp.userAccessCount || 0,
        "stayForTime": formateTime(parseFloat((dataTemp.stayForTime || 0)/(dataTemp.userAccessCount || 1))),
        "buyBtnClickCount": dataTemp.buyBtnClickCount || 0,
        "paySuccessCount": dataTemp.paySuccessCount || 0,
      }
    }else{
      tempData = {
        "name":keyMap[keySort[i]],
        "accessCount": dataTemp.accessCount || 0,
        "userAccessCount":0,
        "stayForTime": dataTemp.shareBtnClickCount || 0,
        "buyBtnClickCount": 0,
        "paySuccessCount": "",
      }
    }
    
    if(keySort[i].indexOf("fanpiao")!==-1){
      tempData.type = "饭票";
    }else if(keySort[i].indexOf("coupon")!==-1){
      tempData.type = "券包"
    }else if(keySort[i].indexOf("activity")!==-1){
      tempData.type = "裂变"
    }
    res.push(tempData)
  }
  // 裂变增加一行数据用于裂变的表头
  res.splice(7,0,{
    "type":"裂变",
    "name":"",
    "accessCount": "点击数",
    "userAccessCount": "点击人数",
    "stayForTime": "分享按钮点击数",
    "buyBtnClickCount": "分享按钮点击人数",
    "paySuccessCount": "",
  })
  return res;
}

async function changeTableDatas(time,merchantId,tableDatas){
  let res = await getBuryingPointData(time,merchantId);
  tableDatas.splice(0,tableDatas.length,...res)
}

 const columns = [
      {
        title: '',
        dataIndex: 'type',
        // customRender: renderContent,
        customRender: ({ text, index }) => {
          const obj = {
            children: text,
            props: {},
          };
          if(index>-1&&index<4){
            obj.props.rowSpan = index==0 ? 4 : 0;
          }else if(index>3&&index<7){
            obj.props.rowSpan = index==4 ? 3 : 0;
          }else if(index>6&&index<10){
            obj.props.rowSpan = index==7 ? 3 : 0;
          }
          return obj;
        },
      },
      {
        title: '',
        dataIndex: 'name',
        customRender: renderContent,
      },
      { 
        title: '访问量',
        dataIndex: 'accessCount',
        customRender: renderContent,
      },
      {
        title: '访问人数',
        dataIndex: 'userAccessCount',
        customRender: renderContent,
      },
      {
        title: '平均停留时间',
        dataIndex: 'stayForTime',
        customRender: renderContent,
      },
      {
        title: '购买按钮点击数',
        dataIndex: 'buyBtnClickCount',
        customRender: renderContent,
      },
      {
        title: '支付成功数',
        dataIndex: 'paySuccessCount',
        customRender: renderContent,
      },
  ];

export default defineComponent({
  setup(props,context) {
    console.log("context---",context)
    let time = reactive(["",""])
    let tableDatas = reactive([]);
    let merchantList = reactive([]);
    let merchantVal = ref("");


    API.getMerchantList().then(res=>{
      res&& merchantList.splice(0,merchantList.length,...res);
    })

    return {
      time,
      tableDatas,
      columns,
      locale,
      merchantVal,
      merchantList,
    };
  },
  watch:{
    merchantVal(nvl,ovl){
      if(nvl){
          this.resetTableDatas()
      }
    }
  },
  methods:{
    async resetTableDatas(){
      let time = this.time;
      if(!(time[0]&&time[1])){
         message.info('请选择正确的起止时间');
         return ;
      }

      // context.setSpiningConfig({
      //   show:true,
      //   title:"正在加载中,请稍等"
      // })

      await changeTableDatas(time,this.merchantVal.value,this.tableDatas)

      // context.setSpiningConfig({
      //   show:false,
      //   title:""
      // })
    },
    async onOk(vals){
      this.time[0] = vals[0];
      this.time[1] = vals[1];
      this.resetTableDatas()
    }
  },
});
</script> 
<style lang="less" scoped>
  .data-analysis-wrapper{
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction: column;
    .title{
      height : 100px;
      line-height : 100px;
      text-align : center;
      font-size: 22px;
      font-weight: bold;
    }
    .time-select-wrapper{
      height : 60px;
      .merchant-slect{
        margin-right : 40px;
      }
    }
    .table-wrapper{
      width :80%
    }
    .spining{
      position: fixed;
      top : 50%;
      left : 50%;
      transform: translate(-50%,-50%);
      z-index: 10;
    }
  }
</style>
