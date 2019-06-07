/*
包含多个基于state计算属性的对象
 */

export default {
  getGoodsArr(state) {
    const arrAll = [];
    let arrMin = [];
    state.goods.forEach(c => {
      if (arrMin.length === 0) {
        arrAll.push(arrMin);
      }
      arrMin.push(c);
      if (arrMin.length === 8) {
        arrMin = [];
      }
    });
    return arrAll;
  },
  totalCount(state) {
    return state.cartGoods.reduce((preTotal, food) =>
      preTotal + food.count, 0
    );
  },
  totalPrice(state) {
    return state.cartGoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0);
  }
};
