<template>
  <van-row justify="center" class="create-top-margin">
    <van-col span="18">
      <div ref="observer">
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
          :style="{ height: cropperHeight + 'px' }"
          preview=".preview-image"
        />
      </div>
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
                    'background-image': backgroundStyles[index]
                  }"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                    加载中
                  </template>
                  <template v-slot:error>加载失败</template>
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
      <van-button type="success" plain class="main-action" @click.prevent="selectImage">上传背景</van-button>
    </van-col>
    <van-col span="7" offset="2">
      <van-button type="success" plain class="main-action" @click.prevent="createImage">生成头像</van-button>
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
          <van-button type="primary" plain class="cropper-action" @click.prevent="reset">重置画布</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="rotate(-90)">左旋 90°</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="rotate(90)">右旋 90°</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="rotate(-45)">左旋 45°</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="rotate(45)">右旋 45°</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="rotate(180)">旋转 180</van-button>
          <van-button type="primary" plain class="cropper-action" @click.prevent="flipX">水平翻转</van-button>
          <van-button type="primary" plain class="cropper-action-last" @click.prevent="flipY">垂直翻转</van-button>
        </div>
      </el-scrollbar>
    </van-col>
  </van-row>
  <div class="create-bottom-margin"></div>
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

<style scoped>
.input-hidden {
  display: none;
}

.create-top-margin {
  margin-top: 44px;
}

.main-cropper {
  width: 100%;
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
import { Toast } from 'vant';
import 'cropperjs/dist/cropper.css';
import VueCropper from 'vue-cropperjs';
import { loadImage, mixImage } from '@/lib/image';

export default {
  data() {
    return {
      index: 0,
      masks: [],
      scaledX: false,
      scaledY: false,
      generatedImages: [],
      cropperHeight: '',
      currentImage: require('@/assets/elements/demo.jpg'),
      backgroundStyles: [
        'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
        'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
        'linear-gradient(-225deg,#69eacb 0%,#eaccf8 48%,#6654f1 100%)'
      ]
    };
  },
  created() {
    this.masks = this.init();
    this.generatedImages = this.init();
    this.index = Math.floor(Math.random() * this.backgroundStyles.length);
  },
  methods: {
    async createImage() {
      for (let i = 0; i < this.masks.length; i++) {
        this.generatedImages[i] = await mixImage(this.$refs.cropper.getCroppedCanvas(), this.masks[i]);
      }
      Toast.success('生成成功，请长按保存');
    },
    init() {
      const array = require.context('@/assets/masks', false).keys();
      for (let i = 0; i < array.length; i++) {
        array[i] = require('@/assets/masks/' + array[i].split('/')[1]);
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
    async setImage(element) {
      let image = await loadImage(element.target.files[0], Toast.fail);
      if (image !== null) {
        this.$refs.cropper.replace(image);
      }
      this.cropperHeight = parseInt(this.$refs.observer.offsetWidth.toString());
    },
    selectImage() {
      this.$refs.input.click();
    }
  },
  components: {
    VueCropper
  }
};
</script>
