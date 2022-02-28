<template>
    <div>
        <van-row justify="center" class="create-top-margin">
            <van-col span="18">
                <vue-cropper
                    ref="cropper"
                    dragMode="move"
                    :aspect-ratio="1"
                    :auto-crop-area="1"
                    :view-mode="3"
                    :modal="false"
                    :background="false"
                    :highlight="false"
                    :toggle-drag-mode-on-dblclick="false"
                    :src="currentImage"
                    @dblclick="createImage"
                    class="main-cropper"
                    preview=".preview-image"
                />
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="20">
                <van-divider></van-divider>
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="20">
                <el-scrollbar>
                    <div class="created-container">
                        <van-col span="8">
                            <div class="preview-image" />
                        </van-col>
                        <van-col span="9" v-for="i in generatedImages" :key="i">
                            <van-row>
                                <van-col span="21" offset="3">
                                    <van-image
                                        :src="i"
                                        class="final-image"
                                        v-bind:style="{
                                            'background-image':
                                                backgroundStyles[index],
                                        }"
                                    >
                                        <template v-slot:loading>
                                            <van-loading
                                                type="spinner"
                                                size="20"
                                            />
                                            加载中
                                        </template>
                                        <template v-slot:error
                                            >加载失败</template
                                        >
                                    </van-image>
                                </van-col>
                            </van-row>
                        </van-col>
                    </div>
                </el-scrollbar>
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="20">
                <van-divider class="divider-after-scroll"></van-divider>
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="7">
                <van-button
                    type="success"
                    plain
                    class="main-action"
                    @click.prevent="selectImage"
                >
                    上传背景
                </van-button>
            </van-col>
            <van-col span="7" offset="2">
                <van-button
                    type="success"
                    plain
                    class="main-action"
                    @click.prevent="createImage"
                >
                    生成头像
                </van-button>
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="20">
                <van-divider></van-divider>
            </van-col>
        </van-row>
        <van-row justify="center">
            <van-col span="20">
                <el-scrollbar>
                    <div class="cropper-action-container">
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="reset"
                        >
                            重置画布
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="rotate(-90)"
                        >
                            左旋 90°
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="rotate(90)"
                        >
                            右旋 90°
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="rotate(-45)"
                        >
                            左旋 45°
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="rotate(45)"
                        >
                            右旋 45°
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="rotate(180)"
                        >
                            旋转 180°
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action"
                            @click.prevent="flipX"
                        >
                            水平翻转
                        </van-button>
                        <van-button
                            type="primary"
                            plain
                            class="cropper-action-last"
                            @click.prevent="flipY"
                        >
                            垂直翻转
                        </van-button>
                    </div>
                </el-scrollbar>
            </van-col>
        </van-row>
        <div class="create-bottom-margin"></div>
        <input
            ref="input"
            type="file"
            name="image"
            accept="image/*"
            @change="setImage"
            class="input-hidden"
        />
    </div>
</template>

<style>
.cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
}
</style>

<style scoped>
body {
    margin: 0%;
    padding: 0%;
    height: 100%;
    font-size: 0%;
    line-height: 0%;
}

.input-hidden {
    display: none;
}

.create-top-margin {
    margin-top: 44px;
}

.main-cropper {
    width: 100%;
    height: 75vw;
}

.created-container {
    display: flex;
    text-align: center;
    margin-bottom: 10px;
}

.preview-image {
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.final-image {
    width: 100%;
    overflow: hidden;
    display: inline-block;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.main-action {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
}

.cropper-action-container {
    display: flex;
    text-align: center;
    margin-bottom: 15px;
}

.cropper-action {
    width: 70px;
    display: flex;
    flex-shrink: 0;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
}

.cropper-action-last {
    width: 70px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
}

.divider-after-scroll {
    margin-top: 6px;
}

.create-bottom-margin {
    margin-bottom: 68px;
}
</style>

<script>
import { Toast } from "vant";
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs";

export default {
    inject: ["reload"],
    data() {
        return {
            index: 0,
            masks: [],
            timer: false,
            scaledX: false,
            scaledY: false,
            generatedImages: [],
            screenWidth: document.documentElement.clientWidth,
            currentImage: require("@/assets/elements/demo.jpg"),
            backgroundStyles: [
                "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
                "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
                "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)",
                "linear-gradient(-225deg,#69eacb 0%,#eaccf8 48%,#6654f1 100%)",
            ],
        };
    },
    created() {
        this.masks = this.init();
        this.generatedImages = this.init();
        this.index = parseInt(Math.random() * this.backgroundStyles.length);
    },
    mounted() {
        let self = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                self.screenWidth = window.screenWidth;
            })();
        };
    },
    watch: {
        screenWidth() {
            if (!this.timer) {
                this.timer = true;
                let self = this;
                setTimeout(function () {
                    self.reload();
                    self.timer = false;
                }, 400);
            }
        },
    },
    methods: {
        createImage() {
            let self = this;
            for (let i = 0; i < this.masks.length; i++) {
                let mask = new Image();
                mask.src = this.masks[i];
                mask.onload = function () {
                    let canvas = document.createElement("canvas");
                    let content = canvas.getContext("2d");
                    canvas.width = 1000;
                    canvas.height = 1000;
                    let cropped = self.$refs.cropper.getCroppedCanvas();
                    content.drawImage(
                        cropped,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    content.drawImage(mask, 0, 0, canvas.width, canvas.height);
                    self.generatedImages[i] = canvas.toDataURL();
                    Toast.success("生成成功，请长按保存");
                };
            }
        },
        init(array) {
            var array = require.context("@/assets/masks", false).keys();
            for (var i = 0; i < array.length; i++) {
                array[i] = require("@/assets/masks/" + array[i].split("/")[1]);
            }
            return array;
        },
        reset() {
            this.$refs.cropper.reset();
        },
        flipX() {
            if (this.scaledX) {
                this.scaledX = false;
                this.$refs.cropper.scaleX(1);
            } else {
                this.scaledX = true;
                this.$refs.cropper.scaleX(-1);
            }
        },
        flipY() {
            if (this.scaledY) {
                this.scaledY = false;
                this.$refs.cropper.scaleY(1);
            } else {
                this.scaledY = true;
                this.$refs.cropper.scaleY(-1);
            }
        },
        rotate(degree) {
            this.$refs.cropper.rotate(degree);
        },
        setImage(element) {
            let self = this;
            const file = element.target.files[0];
            if (file.type.indexOf("image/") === -1) {
                Toast.fail("图片格式错误或不受支持");
                return;
            }
            if (typeof FileReader === "function") {
                const reader = new FileReader();
                reader.onload = (event) => {
                    let test = new Image();
                    test.src = event.target.result;
                    test.onerror = function () {
                        Toast.fail("图片损坏，请检查后重试");
                    };
                    test.onload = function () {
                        self.$refs.cropper.replace(event.target.result);
                    };
                };
                reader.readAsDataURL(file);
            } else {
                Toast.fail("API 未被支持，请更换浏览器后重试");
                return;
            }
        },
        selectImage() {
            this.$refs.input.click();
        },
    },
    components: {
        VueCropper,
    },
};
</script>
