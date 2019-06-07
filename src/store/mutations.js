/*
直接更新state的多个方法的对象
 */
import {
  ADDFOODCOUNT,
  CLEARCART,
  JIANSHAOCOUNT,
  RECEIVE_ADDRESS,
  RECEIVE_GOODS,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPRATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  SEARCHSHOPS
} from './mutation-types';
import Vue from 'vue';

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address;
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods;
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops;
  },
  [RECEIVE_USER](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [RECEIVE_SHOPINFO](state, {shopInfo}) {
    state.shopInfo = shopInfo;
  },
  [RECEIVE_SHOPRATINGS](state, {shopRatings}) {
    state.shopRatings = shopRatings;
  },
  [RECEIVE_SHOPGOODS](state, {shopGoods}) {
    state.shopGoods = shopGoods;
  },
  [ADDFOODCOUNT](state, {food}) {
    if (!food.count) {
      Vue.set(food, 'count', 1);
      state.cartGoods.push(food);
    } else {
      food.count++;
    }
  },
  [JIANSHAOCOUNT](state, {food}) {
    if (food.count) {
      food.count--;
      if (food.count === 0) {
        state.cartGoods.splice(state.cartGoods.indexOf(food), 1);
      }
    }
  },
  [CLEARCART](state) {
    //清除count>0的food,因为右侧food里面带有count>0的 其实就是state.cartGoods,是同一个数组
    state.cartGoods.forEach(food => Vue.delete(food, 'count'));
    state.cartGoods = [];
  },
  [SEARCHSHOPS](state, {searchShops}) {
    state.searchShops = searchShops;
  }
};
