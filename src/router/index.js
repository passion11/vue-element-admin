/*
*  这是一个路由对象js
* */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login/Login';
import UserInfo from '../pages/userInfo/userInfo';
import ShopRatings from '../pages/Shop/ShopRatings/shopRatings';
import ShopInfo from '../pages/Shop/ShopInfo/shopInfo';
import ShopGoods from '../pages/Shop/ShopGoods/shopGoods';
import Shop from '../pages/Shop/Shop';
// import MSite from '../pages/MSite/MSite';
// // import Order from '../pages/Order/Order';
// // import Profile from '../pages/Profile/Profile';
// // import Search from '../pages/Search/Search';
const MSite = () => import ('../pages/MSite/MSite.vue');
const Order = () => import ('../pages/Order/Order');
const Profile = () => import ('../pages/Profile/Profile');
const Search = () => import ('../pages/Search/Search');

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: MSite,//返回路由组件的函数,只有执行此函数才会加载路由组件,开始不会执行
      //只有在第一次请求对应的path时,才会执行此函数,即加载对应的路由组件(路由懒加载)
      meta: {
        showFooter: true //route.meta:route的标识属性,每一个route对象中都有meta属性,默认meta里面是空的
      }
    }, {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    }, {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    }, {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',//初始化路由为MSit
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/shop',
      component: Shop,
      children: [{
        path: '/shop/shopGoods',
        component: ShopGoods
      }, {
        path: '/shop/shopRatings',
        component: ShopRatings
      }, {
        path: '/shop/shopInfo',
        component: ShopInfo
      },
        {
          path: '',
          redirect: '/shop/shopGoods'
        }
      ]
    }
  ]
});
