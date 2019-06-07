<template>
  <section class="msite">
    <!--首页头部-->
    <!--这里如果传的是个常量,直接title="",
            如果传对象,则必须:title="xxx"-->
    <HeadTop :title="address.address">
      <router-link class="header_search"
                   slot="left"
                   to="/search">
        <i class="iconfont iconsousuo"></i>
      </router-link>
      <router-link class="header_login"
                   slot="right"
                   :to="userInfo._id === undefined ? '/login' : '/userInfo'">
        <span class="header_login_text">{{userInfo._id===undefined?'登录/注册':'我的'}}</span>
      </router-link>
    </HeadTop>
    <!--首页导航-->
    <nav class="nav">
      <div v-if="goods.length"
           class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(goodArr, index) in getGoodsArr"
               class="swiper-slide"
               :key="index">
            <a v-for="(good, index) in goodArr"
               class="link_to_food"
               href="javascript:"
               :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + good.image_url">
              </div>
              <span>{{good.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else
           alt="back"
           src="./images/msite_back.svg">
    </nav>
    <ShopList/>
  </section>
</template>
<script>
  import HeadTop from '../../components/HeadTop/HeadTop';
  import 'swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper';
  import ShopList from '../../components/ShopList/ShopList';
  import {mapGetters, mapState} from 'vuex';

  export default {
    data() {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
        ;
    },
    computed: {
      ...mapState(['address', 'goods', 'shops', 'userInfo']),
      ...mapGetters(['getGoodsArr'])
    },
    //个人理解：mounted函数发生在页面渲染后
    //轮播图片要等页面全部加载渲染完再进行轮播配置
    mounted() {
      this.$store.dispatch('getGoods');
      this.$store.dispatch('getShops');
      //因为刚开始的时候食品列表是空的,所以可以使用$nextTick()
      //$nextTick():界面更新会立即创建swipe对象,进行图片轮播
      // this.$nextTick(()=>{
      //   new Swiper('.swiper-container', {
      //     loop: true, //可以循环轮播
      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination'
      //     }
      //   });
      // });
    },
    //等待界面更新,进行轮播的第二方法
    //刚开始state中定义的goods是空的,
    // 等待食品分类数据更新可用update()
    updated() {
      new Swiper('.swiper-container', {
        loop: true, //可以循环轮播
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      });
    },
    components: {HeadTop, ShopList}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

</style>

