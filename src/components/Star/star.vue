<template>
  <div class="star"
       :class="'star-' + size">
    <span v-for="(starClass, index) in starArr"
          class="star-item"
          :class="starClass"
          :key="index"></span>
  </div>
</template>
<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      //根据每个shop的score设置几个star class
      starArr() {
        const {score} = this;
        const on = Math.floor(score);
        const half = Math.ceil(score - on);
        const off = Math.floor(5 - score);
        const starClasses = [];
        if (on > 0) {
          for (let i = 1; i <= on; i++) {
            starClasses.push('on');
          }
        }
        if (half > 0) {
          starClasses.push('half');

        }
        if (off > 0) {
          for (let i = 1; i <= off; i++) {
            starClasses.push('off');
          }
        }
        return starClasses;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0

    .star-item
      display inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &:last-child
          margin-right: 0

        &.on
          bg-image('./images/stars/star48_on')

        &.half
          bg-image('./images/stars/star48_half')

        &.off
          bg-image('./images/stars/star48_off')

    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star36_on')

        &.half
          bg-image('./images/stars/star36_half')

        &.off
          bg-image('./images/stars/star36_off')

    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/stars/star24_on')

        &.half
          bg-image('./images/stars/star24_half')

        &.off
          bg-image('./images/stars/star24_off')

</style>

