<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"
             :class="{on : loginWay === 1}"
             @click="loginWay=1">短信登录</a>
          <a href="javascript:;"
             :class="{on : loginWay === 2}"
             @click="loginWay=2">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on : loginWay === 1}">
            <section class="login_message">
              <input v-model="phone"
                     maxlength="11"
                     placeholder="手机号"
                     type="tel">
              <button class="get_verification"
                      :class="{true_phone : isTruePhone}"
                      :disabled="!isTruePhone"
                      @click.prevent="getCode">
                {{computedTime?'已发送('+computedTime+'s)':'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input v-model="code"
                     maxlength="8"
                     placeholder="验证码"
                     type="tel">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on : loginWay === 2}">
            <section>
              <section class="login_message">
                <input v-model="name"
                       maxlength="11"
                       placeholder="手机/邮箱/用户名"
                       type="text">
              </section>
              <section class="login_verification">
                <input v-if="showPwd"
                       v-model="pwd"
                       maxlength="8"
                       placeholder="密码"
                       type="text">
                <input v-else
                       v-model="pwd"
                       maxlength="8"
                       placeholder="密码"
                       type="password">
                <div class="switch_button"
                     :class="showPwd ? 'on' : 'off'"
                     @click="showPwd=!showPwd">
                  <div class="switch_circle"
                       :class="{right : showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha"
                       maxlength="11"
                       placeholder="验证码"
                       type="text">
                <img alt="captcha"
                     class="get_verification"
                     :src="imgUrl"
                     @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a class="about_us"
           href="javascript:;">关于我们</a>
      </div>
      <a class="go_back"
         href="/#/profile">
        <i class="iconfont iconiconjiantouzuo"></i>
      </a>
    </div>
    <Alert v-show="showAlter"
           :alertText="alertText"
           @closeTip="closeTip"></Alert>
  </section>

</template>
<script>
  import Alert from '../../components/AlertTip/Alert';
  import {loginByPwd, loginBysms, sendCode} from '../../api/index';

  export default {
    data() {
      return {
        loginWay: 2, //1:短信登录 2:密码登录
        computedTime: 0,
        showPwd: false,
        phone: '',
        code: '',
        pwd: '',
        name: '',
        captcha: '',
        showAlter: false,
        alertText: '',
        imgUrl: 'http://localhost:4000/captcha'
      };
    },
    computed: {
      isTruePhone() {
        return /^1\d{10}$/.test(this.phone);
      }
    },
    //因为form表单中任何点击按钮,他的默认行为都是提交表单
    //所以在点击事件@click加入.prevent
    methods: {
      //开启倒计时,异步获取短信验证码
      async getCode() {
        //启动倒计时
        //有可能用户在计时过程中点击了该事件,导致不止一个定时器执行
        //所以只需要保证他每次计时都是从computedTime=0开始有计时器
        if (!this.computedTime) {
          this.computedTime = 30;
          this.IntervalId = setInterval(() => {
            this.computedTime--;
            if (this.computedTime <= 0) {
              //停止计时
              clearInterval(this.IntervalId);
            }

          }, 1000);
          //发送ajax请求发送指定手机号短信验证码
          const result = await sendCode(this.phone);
          if (result.code === 0) {
          } else {
            //短信发送失败
            this.showAlertText(result.msg);
            //如果还在倒计时,立刻停止计时
            if (this.computedTime) {
              clearInterval(this.IntervalId);
              this.computedTime = 0;
            }
          }
        }
      },
      //异步登陆
      async login() {
        let result;
        //短信验证码登陆
        if (this.loginWay === 1) {
          if (!this.isTruePhone) {
            this.showAlertText('手机号不正确!');
            return;
          } else if (!/^\d{6}$/.test(this.code)) {
            //验证码不对
            this.showAlertText('验证码不正确!');
            return;
          }
          result = await loginBysms(this.phone, this.code);
          //密码登陆
        } else {
          if (!this.name) {
            this.showAlertText('名字不能为空!');
            return;
          } else if (!this.pwd) {
            this.showAlertText('密码不能为空!');
            return;
          } else if (!this.captcha) {
            this.showAlertText('验证码不能为空!');
            return;
          }
          const {name, pwd, captcha} = this;
          result = await loginByPwd({name, pwd, captcha});
        }
        //登录中数据处理前先停止倒计时
        if (this.computedTime) {
          clearInterval(this.IntervalId);
          this.computedTime = 0;
        }
        if (result.code === 0) {
          const userInfo = result.data;
          //将user保存在vuex的state
          this.$store.dispatch('UpdateUser', userInfo);
          // 去个人中心页面
          this.$router.replace('/profile');
        } else {
          const msg = result.msg;
          this.showAlertText(msg);
          this.getCaptcha();

        }

      },
      showAlertText(atertText) {
        this.showAlter = true;
        this.alertText = atertText;
      },
      closeTip() {
        this.showAlter = false;
        this.alertText = '';
      },
      getCaptcha() {
        //保证每次都是captcha的请求都发送的
        this.imgUrl = this.imgUrl + '?';
      }
    },

    components: {
      Alert
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.true_phone
                  color black

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(25px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>

