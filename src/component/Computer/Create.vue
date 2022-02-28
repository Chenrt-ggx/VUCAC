<template>
    <div>
        <el-row justify="center" class="cropper-container">
            <el-col :span="19">
                <el-card>
                    <el-row>
                        <el-col :span="24" class="cropper-col">
                            <el-scrollbar
                                height="36vw"
                                class="mask-selection-scrollbar"
                            >
                                <el-radio-group
                                    v-model="radio"
                                    size="large"
                                    class="mask-selection-container"
                                >
                                    <el-radio-button
                                        v-for="(i, index) in masks"
                                        :key="i"
                                        :label="index"
                                    >
                                        <el-image
                                            :src="i"
                                            class="mask-selection-image"
                                            v-bind:style="{
                                                'background-image': activeStyle,
                                            }"
                                        />
                                    </el-radio-button>
                                </el-radio-group>
                            </el-scrollbar>
                            <el-card class="cropper-card">
                                <div ref="observer">
                                    <vue-cropper
                                        ref="cropper"
                                        dragMode="move"
                                        :aspect-ratio="1"
                                        :auto-crop-area="1"
                                        :view-mode="2"
                                        :modal="false"
                                        :background="false"
                                        :highlight="false"
                                        :toggle-drag-mode-on-dblclick="false"
                                        :src="currentImage"
                                        @dblclick="createImage"
                                        class="main-cropper"
                                        :style="{
                                            height: cropperHeight + 'px',
                                        }"
                                        preview=".preview-image"
                                    />
                                </div>
                            </el-card>
                            <div class="cropper-image-group">
                                <div class="preview-image" />
                                <img
                                    v-if="croppedImage"
                                    :src="croppedImage"
                                    class="final-image"
                                />
                                <img
                                    v-else
                                    :src="emptyMergeImage"
                                    class="final-image"
                                />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-divider class="button-divider">
                            <el-button
                                type="success"
                                plain
                                class="cropper-action"
                                @click.prevent="createImage"
                            >
                                <el-icon size="20">
                                    <create />
                                </el-icon>
                                生成头像
                            </el-button>
                        </el-divider>
                    </el-row>
                    <el-row>
                        <el-card class="button-card">
                            <div class="button-container">
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="selectImage"
                                >
                                    <el-icon size="20">
                                        <upload />
                                    </el-icon>
                                    上传背景
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="rotate(-90)"
                                >
                                    <el-icon size="20">
                                        <l-rotate />
                                    </el-icon>
                                    左旋 90°
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="rotate(90)"
                                >
                                    <el-icon size="20">
                                        <r-rotate />
                                    </el-icon>
                                    右旋 90°
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="flipX"
                                >
                                    <el-icon size="20">
                                        <flip-x />
                                    </el-icon>
                                    水平翻转
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="flipY"
                                >
                                    <el-icon size="20">
                                        <flip-y />
                                    </el-icon>
                                    垂直翻转
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    class="cropper-action"
                                    @click.prevent="reset"
                                >
                                    <el-icon size="20">
                                        <reset />
                                    </el-icon>
                                    重置画布
                                </el-button>
                            </div>
                        </el-card>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
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
    transition: all 1s;
}

.input-hidden {
    display: none;
}

.cropper-container {
    margin-top: 45px;
    margin-bottom: 30px;
}

.cropper-col {
    text-align: center;
}

.cropper-card {
    width: 36vw;
    margin-bottom: 10px;
    display: inline-block;
    vertical-align: middle;
}

.main-cropper {
    width: 100%;
}

.cropper-image-group {
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
}

.preview-image {
    margin: 0px;
    height: 17.3vw;
    overflow: hidden;
    border-width: 1px;
    border-radius: 4px;
    margin-bottom: 1.2vw;
    border-style: solid;
    border-color: #e5e7eb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.final-image {
    width: 17.4vw;
    height: 17.4vw;
    margin: 0.05vw;
    overflow: hidden;
    border-width: 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    border-style: solid;
    border-color: #e5e7eb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.button-card {
    width: 100%;
    margin-top: 10px;
}

.cropper-action {
    margin-top: 8px;
    margin-bottom: 8px;
}

.button-container {
    margin-left: 3px;
    margin-right: 3px;
    text-align: center;
}

.button-divider {
    margin-top: 25px;
    margin-bottom: 25px;
}

.mask-selection-scrollbar {
    margin-right: 20px;
    display: inline-block;
    vertical-align: middle;
}

.mask-selection-container {
    width: 16vw;
    border-width: 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    border-style: solid;
    border-color: #e5e7eb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.mask-selection-image {
    border-radius: 4px;
    background-color: #454545;
    box-shadow: 0 2px 6px #404040;
}
</style>

<script>
import {
    Merge24Regular as Create,
    ArrowReset24Filled as Reset,
    ArrowUpload20Filled as Upload,
    FlipVertical24Regular as FlipY,
    FlipHorizontal24Regular as FlipX,
    ArrowRotateClockwise20Regular as RRotate,
    ArrowRotateCounterclockwise20Regular as LRotate,
} from "@vicons/fluent";
import "cropperjs/dist/cropper.css";
import VueCropper from "vue-cropperjs";
import { ElRadioGroup, ElRadioButton, ElMessage } from "element-plus";

export default {
    inject: ["reload"],
    data() {
        return {
            masks: [],
            radio: -1,
            timer: false,
            scaledX: false,
            scaledY: false,
            activeStyle: "",
            croppedImage: "",
            cropperHeight: "",
            screenWidth: document.documentElement.clientWidth,
            currentImage: require("@/assets/elements/demo.jpg"),
            emptyMergeImage: require("@/assets/elements/tocreate.jpg"),
            backgroundStyles: [
                "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
                "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
                "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)",
                "linear-gradient(-225deg,#69eacb 0%,#eaccf8 48%,#6654f1 100%)",
            ],
        };
    },
    created() {
        this.masks = require.context("@/assets/masks", false).keys();
        for (var i = 0; i < this.masks.length; i++) {
            this.masks[i] = require("@/assets/masks/" +
                this.masks[i].split("/")[1]);
        }
        this.activeStyle = this.backgroundStyles[
            parseInt(Math.random() * this.backgroundStyles.length)
        ];
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
            if (this.radio < 0) {
                ElMessage({
                    message: "请在左侧选择您喜欢的遮罩",
                    type: "warning",
                });
            } else {
                let self = this;
                let mask = new Image();
                mask.src = this.masks[this.radio];
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
                    self.croppedImage = canvas.toDataURL();
                };
            }
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
                ElMessage.error("图片格式错误或不受支持");
                return;
            }
            if (typeof FileReader === "function") {
                const reader = new FileReader();
                reader.onload = (event) => {
                    let test = new Image();
                    test.src = event.target.result;
                    test.onerror = function () {
                        ElMessage.error("图片损坏，请检查后重试");
                    };
                    test.onload = function () {
                        self.$refs.cropper.replace(event.target.result);
                        self.cropperHeight = self.$refs.observer.offsetWidth;
                    };
                };
                reader.readAsDataURL(file);
            } else {
                ElMessage.error("API 未被支持，请更换浏览器后重试");
                return;
            }
        },
        selectImage() {
            this.$refs.input.click();
        },
    },
    components: {
        VueCropper,
        Create,
        Reset,
        Upload,
        FlipY,
        FlipX,
        RRotate,
        LRotate,
        ElRadioGroup,
        ElRadioButton,
        ElMessage,
    },
};
</script>
