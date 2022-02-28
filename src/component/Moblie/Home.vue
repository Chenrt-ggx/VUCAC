<template>
    <div>
        <van-config-provider :theme-vars="themeVars">
            <van-swipe :autoplay="interval" indicator-color="white" lazy-render>
                <van-swipe-item v-for="item in images" :key="item">
                    <van-image :src="item" />
                </van-swipe-item>
            </van-swipe>
            <van-divider></van-divider>
            <van-grid square :column-num="2">
                <van-grid-item>
                    <van-image
                        :src="createSrc"
                        fit="contain"
                        @click.prevent="handleCreate"
                    />
                </van-grid-item>
                <van-grid-item>
                    <van-image
                        :src="selectSrc"
                        fit="contain"
                        @click.prevent="handleSelect"
                    />
                </van-grid-item>
            </van-grid>
            <van-divider></van-divider>
            <div ref="scroll"></div>
            <div v-for="i in imageList" :key="i">
                <van-grid square :column-num="imagePerline">
                    <van-grid-item
                        v-for="(j, index) in i"
                        :key="j"
                        @click.prevent="preview(i, index)"
                    >
                        <van-image :src="j" fit="contain" lazy-load />
                    </van-grid-item>
                </van-grid>
                <van-divider></van-divider>
            </div>
            <van-empty
                description="更多头像正在赶来的路上~"
                image-size="80px"
            ></van-empty>
            <div class="home-bottom-margin"></div>
            <el-backtop :right="20" :bottom="60" />
        </van-config-provider>
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

.home-bottom-margin {
    margin-bottom: 68px;
}
</style>

<script>
import { Toast, ImagePreview } from "vant";
import Settings from "../../settings.json";

export default {
    data() {
        return {
            images: [],
            imageList: [],
            interval: 5000,
            imagePerline: Settings["imagesPerline"],
            createSrc: require("@/assets/elements/create.jpg"),
            selectSrc: require("@/assets/elements/select.jpg"),
            themeVars: {
                gridItemContentPadding: 0,
            },
        };
    },
    created() {
        this.images = require.context("@/assets/m_display", false).keys();
        for (var i = 0; i < this.images.length; i++) {
            this.images[i] = require("@/assets/m_display/" +
                this.images[i].split("/")[1]);
        }
        let masks = require.context("@/assets/masks", false).keys();
        let backgrounds = require.context("@/assets/backgrounds", false).keys();
        for (var i = 0; i < backgrounds.length; i++) {
            this.imageList.push([]);
            this.imageList[i].push(
                require("@/assets/backgrounds/" + backgrounds[i].split("/")[1])
            );
            var background_name = backgrounds[i].split("/")[1].split(".");
            background_name.pop();
            background_name = background_name.join(".");
            for (var j = 0; j < masks.length; j++) {
                var mask_name = masks[j].split("/")[1].split(".");
                mask_name.pop();
                mask_name = mask_name.join(".");
                this.imageList[i].push(
                    require("@/assets/merge_mask" +
                        (j + 1) +
                        "/" +
                        mask_name +
                        "_" +
                        background_name +
                        ".jpg")
                );
            }
        }
    },
    methods: {
        preview(images, index) {
            ImagePreview({
                images: images,
                startPosition: index,
                closeable: true,
                showIndicators: true,
            });
        },
        handleCreate() {
            this.$router.push("/m/create");
        },
        handleSelect() {
            var element =
                this.$store.getters.getUserAgent.indexOf("MicroMessenger") != -1
                    ? document.body
                    : document.documentElement;
            let start = element.scrollTop;
            let finish = start + this.$refs.scroll.getBoundingClientRect().top;
            let move = setInterval(function () {
                var current = element.scrollTop;
                var step = (finish - current) / 8;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (current >= finish) {
                    clearInterval(move);
                } else {
                    element.scrollTop = current + step;
                }
            }, 1);
            Toast.success("请点击查看大图");
        },
    },
};
</script>
