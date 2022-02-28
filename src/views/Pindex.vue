<template>
    <div class="head-container">
        <div class="nav-menu-container">
            <n-grid :cols="6">
                <n-gi>
                    <router-link to="/p/home">
                        <img
                            src="@/assets/elements/header.png"
                            class="nav-image"
                        />
                    </router-link>
                </n-gi>
                <n-gi span="4">
                    <n-menu
                        :options="navMenu"
                        :icon-size="iconSize"
                        :value="$route.path"
                        mode="horizontal"
                        class="nav-menu"
                    />
                </n-gi>
                <n-gi>
                    <div class="nav-timer">
                        {{ nowDateTime }}
                    </div>
                </n-gi>
            </n-grid>
        </div>
        <n-divider />
        <router-view></router-view>
        <div class="footer-margin"></div>
        <n-divider>
            <img src="@/assets/elements/logo.png" class="footer-image" />
        </n-divider>
        <div class="footer-margin"></div>
        <div v-for="i in footerText" :key="i" class="footer-text">
            {{ i }}
        </div>
        <div class="end-margin"></div>
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

.nav-menu-container {
    height: 50px;
    margin-top: 8px;
    text-align: center;
}

.nav-menu {
    font-size: 20px;
}

.nav-image {
    height: 40px;
}

.nav-timer {
    font-size: 20px;
    line-height: 45px;
}

.head-container >>> .n-divider {
    margin-top: 0px;
    margin-bottom: 0px;
}

.head-container >>> .n-menu-item-content-header {
    margin-top: 5px;
}

.footer-image {
    width: 50px;
}

.footer-margin {
    width: 100%;
    margin: 25px;
}

.footer-text {
    width: 100%;
    height: 26px;
    color: #454545;
    line-height: 26px;
    text-align: center;
}

.end-margin {
    width: 100%;
    margin: 45px;
}
</style>

<script>
import { h } from "vue";
import { RouterLink } from "vue-router";
import { NIcon, NGrid, NGi, NMenu, NDivider } from "naive-ui";
import {
    HomeOutline as HomeIcon,
    PlayCircleOutline as BrowseIcon,
    CreateOutline as CreateIcon,
    InformationCircleOutline as InfoIcon,
} from "@vicons/ionicons5";
import Settings from "../settings.json";

function getIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

function getNamedRoute(dest, name) {
    return () => h(RouterLink, { to: { path: dest } }, { default: () => name });
}

export default {
    data() {
        return {
            iconSize: 22,
            nowDateTime: "",
            footerText: Settings["footerText"],
            navMenu: [
                {
                    label: getNamedRoute("/p/home", "主页"),
                    key: "/p/home",
                    icon: getIcon(HomeIcon),
                },
                {
                    label: getNamedRoute("/p/browse", "浏览"),
                    key: "/p/browse",
                    icon: getIcon(BrowseIcon),
                },
                {
                    label: getNamedRoute("/p/create", "制作"),
                    key: "/p/create",
                    icon: getIcon(CreateIcon),
                },
                {
                    label: getNamedRoute("/p/info", "关于"),
                    key: "/p/info",
                    icon: getIcon(InfoIcon),
                },
            ],
        };
    },
    created() {
        this.loopUpdate();
    },
    methods: {
        loopUpdate() {
            setInterval(this.updateTime, 500);
        },
        updateTime() {
            this.nowDateTime = new Date().toLocaleString();
        },
    },
    components: {
        NIcon,
        NGrid,
        NGi,
        NMenu,
        NDivider,
    },
};
</script>
