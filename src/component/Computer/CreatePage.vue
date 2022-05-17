<template>
  <el-row justify="center" class="cropper-container">
    <el-col :span="19">
      <el-card>
        <el-row>
          <el-col :span="24" class="cropper-col">
            <el-scrollbar height="36vw" class="mask-selection-scrollbar">
              <el-radio-group v-model="radio" size="large" class="mask-selection-container">
                <el-radio-button v-for="(i, index) in masks" :key="i" :label="index">
                  <el-image
                    :src="i"
                    class="mask-selection-image"
                    v-bind:style="{
                      'background-image': activeStyle
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
                  :style="{ height: cropperHeight + 'px' }"
                  preview=".preview-image"
                />
              </div>
            </el-card>
            <div class="cropper-image-group">
              <div class="preview-image" />
              <img v-if="croppedImage" :src="croppedImage" class="final-image" alt="final" />
              <img v-else :src="emptyMergeImage" class="final-image" alt="final" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-divider class="button-divider">
            <el-button type="success" plain class="cropper-action" @click.prevent="selectImage">
              <Icon size="20" class="action-icon">
                <create />
              </Icon>
              上传背景
            </el-button>
          </el-divider>
        </el-row>
        <el-row>
          <el-card class="button-card">
            <div class="button-container">
              <el-button type="primary" plain class="cropper-action" @click.prevent="createImage">
                <Icon size="20" class="action-icon">
                  <upload />
                </Icon>
                生成头像
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="rotate(-90)">
                <Icon size="20" class="action-icon">
                  <l-rotate />
                </Icon>
                左旋 90°
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="rotate(90)">
                <Icon size="20" class="action-icon">
                  <r-rotate />
                </Icon>
                右旋 90°
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="rotate(180)">
                <Icon size="20" class="action-icon">
                  <r-rotate />
                </Icon>
                旋转 180°
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="flipX">
                <Icon size="20" class="action-icon">
                  <flip-x />
                </Icon>
                水平翻转
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="flipY">
                <Icon size="20" class="action-icon">
                  <flip-y />
                </Icon>
                垂直翻转
              </el-button>
              <el-button type="primary" plain class="cropper-action" @click.prevent="reset">
                <Icon size="20" class="action-icon">
                  <reset />
                </Icon>
                重置画布
              </el-button>
            </div>
          </el-card>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <input ref="input" type="file" name="image" accept="image/*" @change="setImage" class="input-hidden" />
</template>

<style lang="scss">
.main-cropper {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
</style>

<style scoped lang="scss">
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
  height: 17.3vw;
  overflow: hidden;
  border-width: 1px;
  border-radius: 4px;
  margin: 0 0 1.2vw;
  border-style: solid;
  border-color: #e5e7eb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.final-image {
  width: 17.4vw;
  height: 17.4vw;
  overflow: hidden;
  border-width: 1px;
  border-radius: 4px;
  border-style: solid;
  border-color: #e5e7eb;
  margin: 0.05vw 0.05vw 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.button-card {
  width: 100%;
  margin-top: 10px;
}

.cropper-action {
  margin: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
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
  border-width: 0 0 0 1px;
  border-radius: 4px;
  margin-bottom: 10px;
  border-style: solid;
  border-color: #e5e7eb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0;
  }
}

.mask-selection-image {
  border-radius: 4px;
  background-color: #454545;
  box-shadow: 0 2px 6px #404040;
}

.action-icon {
  margin-right: 5px;
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
  ArrowRotateCounterclockwise20Regular as LRotate
} from '@vicons/fluent';
import 'cropperjs/dist/cropper.css';
import { Icon } from '@vicons/utils';
import VueCropper from 'vue-cropperjs';
import { loadImage, mixImage } from '@/lib/image';
import { ElRadioGroup, ElRadioButton, ElMessage } from 'element-plus';

export default {
  data() {
    return {
      masks: [],
      radio: -1,
      scaledX: false,
      scaledY: false,
      activeStyle: '',
      croppedImage: '',
      cropperHeight: '',
      currentImage: require('@/assets/elements/demo.jpg'),
      emptyMergeImage: require('@/assets/elements/tocreate.jpg'),
      backgroundStyles: [
        'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
        'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
        'linear-gradient(-225deg,#69eacb 0%,#eaccf8 48%,#6654f1 100%)'
      ]
    };
  },
  created() {
    this.masks = require.context('@/assets/masks', false).keys();
    for (let i = 0; i < this.masks.length; i++) {
      this.masks[i] = require('@/assets/masks/' + this.masks[i].split('/')[1]);
    }
    this.activeStyle = this.backgroundStyles[Math.floor(Math.random() * this.backgroundStyles.length)];
  },
  mounted() {
    ElMessage({
      message: '双击下方图片即可合成头像',
      type: 'success'
    });
  },
  methods: {
    async createImage() {
      if (this.radio < 0) {
        ElMessage({
          message: '请在左侧选择您喜欢的遮罩',
          type: 'warning'
        });
      } else {
        this.croppedImage = await mixImage(this.$refs.cropper.getCroppedCanvas(), this.masks[this.radio]);
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
    async setImage(element) {
      let image = await loadImage(element.target.files[0], ElMessage.error);
      if (image !== null) {
        this.$refs.cropper.replace(image);
        ElMessage({
          message: '上传成功，双击下图即可合成头像',
          type: 'success'
        });
      }
      this.cropperHeight = parseInt(this.$refs.observer.offsetWidth.toString());
    },
    selectImage() {
      this.$refs.input.click();
    }
  },
  components: {
    Icon,
    Create,
    Reset,
    Upload,
    FlipY,
    FlipX,
    RRotate,
    LRotate,
    VueCropper,
    ElRadioGroup,
    ElRadioButton
  }
};
</script>
