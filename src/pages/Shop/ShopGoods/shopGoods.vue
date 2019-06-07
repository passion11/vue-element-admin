<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper"
           ref="menuWrapper">
        <ul>
          <li v-for="(shopGood, index) in shopGoods"
              class="menu-item"
              :class="{current : index === getFoodIndex}"
              :key="index"
              @click="setClass(index)"><span class="text bottom-border-1px">
<img v-if="shopGood.icon"
     class="icon"
     :src="shopGood.icon">
{{shopGood.name}}
</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper"
           ref="foodsWrapper">
        <ul ref="foods">
          <li v-for="(shopGood, index) in shopGoods"
              class="food-list-hook"
              :key="index">
            <h1 class="title">{{shopGood.name}}</h1>
            <ul>
              <li v-for="(food, index) in shopGood.foods"
                  class="food-item bottom-border-1px"
                  :key="index">
                <div class="icon">
                  <img height="57"
                       width="57"
                       :src="food.image"
                       @click="showFood(food)">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food v-if="showFoodImg && food"
          :food="food"
          @showFood="showFood"/>
    <ShopCart/>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import BetterScroll from 'better-scroll';
  import CartControl from '../../../components/CartControl/cartControl';
  import Food from '../../../components/Food/food';
  import ShopCart from '../../../components/ShopCart/shopCart';

  export default {
    data() {
      return {
        scrollY: 0,  //右边滑动的Y轴坐标
        tops: [], //右侧每一个foods数组距离上部的top值组成的数组
        showFoodImg: false,
        food: {}
      };
    },
    computed: {
      ...mapState(['shopGoods']),
      //获得右侧对应的某一个foods数组的下标,
      //通过判断左边类别下标跟右侧foods数组的下标来判断是否给左边类别加class(颜色变重)
      getFoodIndex() {
        const {tops, scrollY} = this;
        //scrollY在数组中查找符合区间范围的数组下标
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1];
        });
        return index;
      }
    },
    mounted() {
      this.$store.dispatch('getShopGoods', () => {
        //数据更新后执行
        this.$nextTick(() => { //列表数据更新后执行,即:shopGoods从[]变成数据后
          //因为要实现左右两边均可滑动,以显示所有数据,所以要要等shopGoods更新后才能执行.
          //设置滑动效果,不同于swipe的是,他必须绑定最外层跟内部div
          new BetterScroll('.menu-wrapper', {
            click: true
          });
          this.foodScrollY = new BetterScroll('.foods-wrapper', {
            click: true,
            scrollY: true, //开启垂直滑动,该配置对象默认scrollY=true;所以也可以不写
            probeType: 2   //当配置对象中1时,只能按住区域滑动才触发这个对象才派发对应(这里是scroll)的事件
          });              //probeType=2,按住区域立刻滑动一大块松手(包含probeType=1),触发事件
          //probeType=0,不触发任何监听的事件
          //给右侧foods绑定scroll监听
          this.foodScrollY.on('scroll', ({x, y}) => {
            this.scrollY = Math.abs(y);
          });
          this.initTops();
        });
      });
    },
    methods: {
      //初始化每个foods数组的top值
      initTops() {
        const tops = [];
        let top = 0;
        tops.push(top);
        //从ref属性值为foods的标签对象中获得class为food-list-hook的标签对象
        //获得每一个foods数组
        const lis = this.$refs.foods.getElementsByClassName('food-list-hook');
        //Array.prototype.slice.call(lis):将lis这个多个标签对象组成的数组变成真数组
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight;//clientHeight:元素对象距离父元素的高度
          tops.push(top);//每个foods数组的top全部添加到vue.data.tops中
        });
        this.tops = tops;
      },
      //点击类别,显示对应的foods元素
      setClass(index) {
        this.scrollY = this.tops[index];
        this.foodScrollY.scrollTo(0, -this.scrollY, 300);
      },
      showFood(obj) {
        this.showFoodImg = !this.showFoodImg;
        this.food = obj;
      }

    },
    components: {CartControl, Food, ShopCart}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


