export function formatDishes(dishes=[]) {
  let keyArr = ["attrList","categoryId","childDishGroups","discountPrice","id","imageUrl","shilaiImageUrl","name","price","originPrice","supplyCondiments"];
  return dishes.map(categoryItem=>{
    categoryItem.dishList = categoryItem.dishList.map(dish=>{
      let newDish = {}
      keyArr.forEach(key=>{
        newDish[key] = dish[key]
      })
      return newDish
    }) 
    return categoryItem;
  })
}


export function formatMerchant(merchantList) { 
  return merchantList.map(merchantItem => {
    let merchantInfo = {}
    merchantInfo.id = merchantItem.id;
    merchantInfo.name = merchantItem.basicInfo.name;
    return merchantInfo
  })
}