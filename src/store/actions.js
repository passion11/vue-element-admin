/*
通过mutations间接更新state多个方法的对象
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
import {
  loginOut,
  reqAddress,
  reqGoodsList,
  reqShopGoods,
  reqShopInfo,
  reqShopListByGeoAndKey,
  reqShopRatings,
  reqShopsList,
  userInfo
} from '../api';

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude;
    const result = await reqAddress(geohash);
    //如果返回的json对象中的code等于0则为请求成功
    if (result.code === 0) {
      const address = result.data;
      //提交给mutations中的RECEIVE_ADDRESS函数来更新state
      commit(RECEIVE_ADDRESS, {address});
    }
  },
  //获取食品分类
  async getGoods({commit}) {
    const result = await reqGoodsList();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, {goods});
    }
  },
  //获取某位置的商家列表
  async getShops({commit, state}) {
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await reqShopsList(latitude, longitude);
    if (result.code === 0) {
      const shops = result.data;
      commit(RECEIVE_SHOPS, {shops});
    }
  },
  UpdateUser({commit}, userInfo) {
    commit(RECEIVE_USER, {userInfo});
  },
  async getUserInfo({commit}) {
    const result = await userInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER, {userInfo});
    }
  },
  async clearUserInfo({commit}) {
    await loginOut();
    const userInfo = {};
    commit(RECEIVE_USER, {userInfo});
  },
  //异步获取Shop中具体商家信息
  async getShopInfo({commit}, callback) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const shopInfo = result.data;
      commit(RECEIVE_SHOPINFO, {shopInfo});
      callback && callback();
    }
  },
  //异步获取Shop中具体的商家商品信息
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const shopGoods = result.data;
      commit(RECEIVE_SHOPGOODS, {shopGoods});
      //数据更新了通知下组件
      callback && callback();
    }
  },
  //异步获取Shop中具体的商家评价信息
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const shopRatings = result.data;
      commit(RECEIVE_SHOPRATINGS, {shopRatings});
      callback && callback();
    }
  },
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADDFOODCOUNT, {food});
    } else {
      commit(JIANSHAOCOUNT, {food});
    }
  },
  clearCart({commit}) {
    commit(CLEARCART);
  },
  async getShopsBySearch({commit, state}, content) {
    const latitude = state.latitude;
    const longitude = state.longitude;
    const geohash = latitude + ',' + longitude;
    const result = await reqShopListByGeoAndKey(geohash, content);
    if (result.code === 0) {
      const searchShops = result.data;
      commit(SEARCHSHOPS, {searchShops});
    }
  }
};
