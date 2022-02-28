<template>
    <div>
        <el-carousel
            :interval="interval"
            :height="height"
            class="carousel-container"
        >
            <el-carousel-item v-for="item in images" :key="item">
                <el-image :src="item" />
            </el-carousel-item>
        </el-carousel>
        <el-row justify="center">
            <el-col :span="20">
                <el-divider class="home-card-divider">
                    <router-link to="/p/create">
                        <el-icon size="40" color="#95de64">
                            <create-icon />
                        </el-icon>
                    </router-link>
                </el-divider>
                <el-row justify="center">
                    <el-col :span="18">
                        <el-card class="home-image-card">
                            <router-link to="/p/create">
                                <el-image
                                    :src="createSrc"
                                    class="home-image-element"
                                />
                            </router-link>
                            <el-divider
                                direction="vertical"
                                class="home-inner-divider"
                            ></el-divider>
                            <div class="home-text-div">
                                <li v-for="i in createIntroduce" :key="i">
                                    {{ i }}
                                </li>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-divider class="home-card-divider">
                    <router-link to="/p/browse">
                        <el-icon size="40" color="#b37feb">
                            <browse-icon />
                        </el-icon>
                    </router-link>
                </el-divider>
                <el-row justify="center">
                    <el-col :span="18">
                        <el-card class="home-image-card">
                            <router-link to="/p/browse">
                                <el-image
                                    :src="selectSrc"
                                    class="home-image-element"
                                />
                            </router-link>
                            <el-divider
                                direction="vertical"
                                class="home-inner-divider"
                            ></el-divider>
                            <div class="home-text-div">
                                <li v-for="i in selectIntroduce" :key="i">
                                    {{ i }}
                                </li>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
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

.carousel-container {
    text-align: center;
}

.home-image-card {
    margin-top: 50px;
}

.home-image-element {
    width: 20%;
    margin-top: 20px;
    margin-left: 2%;
    border-radius: 4px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: middle;
    box-shadow: 0 2px 6px #404040;
}

.home-card-divider {
    margin-top: 75px;
}

.home-inner-divider {
    height: 220px;
    margin-left: 3.5%;
    margin-right: 3.5%;
    vertical-align: middle;
}

.home-text-div {
    width: 69%;
    font-size: 20px;
    color: #363636;
    line-height: 32px;
    margin-left: 0.8%;
    text-align: justify;
    display: inline-block;
    vertical-align: middle;
}
</style>

<script>
import {
    CreateOutline as CreateIcon,
    PlayCircleOutline as BrowseIcon,
} from "@vicons/ionicons5";
import Settings from "../../settings.json";

export default {
    data() {
        return {
            images: [],
            height: "",
            interval: 5000,
            createIntroduce: Settings["createIntroduce"],
            selectIntroduce: Settings["selectIntroduce"],
            createSrc: require("@/assets/elements/create.jpg"),
            selectSrc: require("@/assets/elements/select.jpg"),
        };
    },
    created() {
        this.images = require.context("@/assets/p_display", false).keys();
        for (var i = 0; i < this.images.length; i++) {
            this.images[i] = require("@/assets/p_display/" +
                this.images[i].split("/")[1]);
        }
        var img = new Image();
        img.src = this.images[0];
        let self = this;
        img.onload = function () {
            self.height = (100 * img.height) / img.width + "vw";
        };
    },
    components: {
        BrowseIcon,
        CreateIcon,
    },
};
</script>
