import Vue from 'vue';
import App from './App.vue';
import './filters';
import router from './router/index';
import store from './store/index';
import loading from './common/loading/loading.jpg';
import {Button} from 'mint-ui';
import VueLazyload from 'vue-lazyload';
import './mock/mockserver'; //加载mockserver 使得能够作用于改项目,否则只在所创的js文件里生效
//注册全局组件标签,使得整个界面可以用上mint-ui里面的一个button标签
//标签名:<mt-button>
Vue.use(VueLazyload, {
  loading
}); //懒加载图片使用:在对应要显示的图片的src属性变成 v-lazy即可
Vue.component(Button.name, Button);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
