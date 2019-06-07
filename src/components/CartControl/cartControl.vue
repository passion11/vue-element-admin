<template>
  <div>
    <div class="cartcontrol">
      <transition name="move">
        <div v-show="food.count"
             class="iconfont iconremove"
             @click.stop="updateCount(0)"></div>
      </transition>

      <div v-show="food.count"
           class="cart-count">{{food.count}}
      </div>
      <div class="iconfont iconjia"
           @click.stop="updateCount(1)"></div>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      food: Object
    },
    methods: {
      updateCount(isAdd) {
        const {food} = this;
        this.$store.dispatch('updateFoodCount', {isAdd, food});
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0

    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-removecircleoutline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green

      &.move-enter-active, &.move-leave-active
        transition all .3s

      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

    .icon-addcircle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

