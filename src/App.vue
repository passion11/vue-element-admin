<template>
  <div id="app">
    <router-view/>

    <FootGuide v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import FootGuide from './components/FootGuide/FootGuide';

  export default {
    async mounted() {
      this.$store.dispatch('getAddress');
      this.$store.dispatch('getUserInfo');
    }
    ,

    components: {FootGuide}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
