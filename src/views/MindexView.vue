<template>
  <div :style="{ width: fixWidth + 'px' }" class="mobile-content">
    <router-view />
    <van-tabbar :active="$route.path" route safe-area-inset-bottom>
      <van-tabbar-item replace to="/m/home" name="/m/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/m/create" name="/m/create" icon="edit">制作</van-tabbar-item>
      <van-tabbar-item v-if="showInfoInMobile" replace to="/m/info" name="/m/info" icon="info-o">
        关于
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.mobile-content {
  margin: 0 auto;
}
</style>

<script>
import Settings from '../settings.json';

export default {
  data() {
    return {
      fixWidth: '',
      showInfoInMobile: Settings['showInfoInMobile']
    };
  },
  mounted() {
    this.fixWidth = Math.min(document.body.clientHeight / 1.7, document.body.clientWidth);
  }
};
</script>
