<template>
    <div>
        <router-view></router-view>
        <van-tabbar :active="$route.path" route safe-area-inset-bottom>
            <van-tabbar-item replace to="/m/home" name="/m/home" icon="home-o">
                主页
            </van-tabbar-item>
            <van-tabbar-item
                replace
                to="/m/create"
                name="/m/create"
                icon="edit"
            >
                制作
            </van-tabbar-item>
            <van-tabbar-item
                v-if="showInfoInMobile"
                replace
                to="/m/info"
                name="/m/info"
                icon="info-o"
            >
                关于
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style scoped>
body {
    margin: 0%;
    padding: 0%;
    height: 100%;
    font-size: 0%;
    line-height: 0%;
}
</style>

<script>
import Settings from "../settings.json";

export default {
    data() {
        return {
            showInfoInMobile: Settings["showInfoInMobile"],
        };
    },
};
</script>
