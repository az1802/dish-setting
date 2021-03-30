import Vue from 'vue'

const filters = {
  normalizePrice(price) {
    if (!price) {
      return 0
    }
    return Math.abs(Number((price / 100).toFixed(2)))
  },
  status(status) {
    switch (status) {
      case 'APPROVED':
        return '已下单'
      case 'PAID':
        return '已完成'
      case 'POS_RETURN':
        return '已退款'
      default:
        return ''
    }
  },
  payMethod(payMethod) {
    switch (payMethod) {
      case 'WALLET':
        return '时来钱包'
      case 'WECHAT_PAY':
        return '微信支付'
      case 'ALIPAY':
        return '支付宝支付'
      case 'SHILAI_MEMBER_CARD_PAY':
        return '会员卡支付'
      case 'FANPIAO_PAY':
        return '时来饭票'
      case 'TIAN_QUE_PAY':
        return '微信支付'
      default:
        return ''
    }
  },
  foodName(name) { 
    return String(name).replace(/★/ig,"🌶")
  }
}


function addFilters(app) { 
  app.config.globalProperties.$filters = {};
  // 添加过滤器方法
  Object.keys(filters).forEach(k => app.config.globalProperties.$filters[k] = filters[k]);

}


export default addFilters;
