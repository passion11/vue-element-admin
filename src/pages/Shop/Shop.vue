<template>
  <div>
    <ShopHead/>
    <div class="tab">
      <div class="tab-item">
        <router-link replace to="/shop/shopGoods">点餐
        </router-link>
      </div>
      <div class="tab-item">
        <router-link replace to="/shop/shopRatings">评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link replace to="/shop/shopInfo">商家
        </router-link>
      </div>
    </div>
    <keep-alive><!--缓存路由,防止每次切换路由都要请求一次后台接口-->
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
  import ShopHead from '../../components/ShopHead/shopHead';
  import ShopInfo from './ShopInfo/shopInfo';
  import ShopGoods from './ShopGoods/shopGoods';
  import ShopRatinhs from './ShopRatings/shopRatings';

  export default {
    data() {
      return {};
    },
    mounted() {
      this.$store.dispatch('getShopInfo');

    },

    components: {
      ShopHead,
      ShopGoods,
      ShopInfo,
      ShopRatinhs
    }
  }
  ;
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))

    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)

      a
        display block
        position relative

        &.router-link-active
          color #02a774

          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>

