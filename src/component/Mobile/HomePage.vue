<template>
  <van-config-provider :theme-vars="themeVars">
    <n-carousel autoplay>
      <img class="carousel-img" v-for="item in images" :key="item" :src="item" alt="carousel-img" />
    </n-carousel>
    <van-divider></van-divider>
    <van-grid square :column-num="2">
      <van-grid-item>
        <van-image :src="createSrc" fit="contain" @click.prevent="handleCreate" />
      </van-grid-item>
      <van-grid-item>
        <van-image :src="selectSrc" fit="contain" @click.prevent="handleSelect" />
      </van-grid-item>
    </van-grid>
    <van-divider></van-divider>
    <div ref="scroll"></div>
    <div v-for="i in imageList" :key="i">
      <van-grid square :column-num="imagePerLine">
        <van-grid-item v-for="(j, index) in i" :key="j" @click.prevent="preview(i, index)">
          <van-image :src="j" fit="contain" lazy-load />
        </van-grid-item>
      </van-grid>
      <van-divider></van-divider>
    </div>
    <van-empty description="更多头像正在赶来的路上~" image-size="80px" class="home-bottom-margin"></van-empty>
    <el-backtop :right="20" :bottom="60" />
  </van-config-provider>
</template>

<style scoped>
.home-bottom-margin {
  margin-bottom: 68px;
}

.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>

<script>
import { NCarousel } from 'naive-ui';
import Settings from '../../settings.json';
import { Toast, ImagePreview } from 'vant';

export default {
  data() {
    return {
      images: [],
      imageList: [],
      imagePerLine: Settings['imagesPerLine'],
      createSrc: require('@/assets/elements/create.jpg'),
      selectSrc: require('@/assets/elements/select.jpg'),
      themeVars: {
        gridItemContentPadding: 0
      }
    };
  },
  created() {
    this.images = require.context('@/assets/m_display', false).keys();
    for (let i = 0; i < this.images.length; i++) {
      this.images[i] = require('@/assets/m_display/' + this.images[i].split('/')[1]);
    }
    let masks = require.context('@/assets/masks', false).keys();
    let backgrounds = require.context('@/assets/backgrounds', false).keys();
    for (let i = 0; i < backgrounds.length; i++) {
      this.imageList.push([]);
      this.imageList[i].push(require('@/assets/backgrounds/' + backgrounds[i].split('/')[1]));
      let backgroundName = backgrounds[i].split('/')[1].split('.');
      backgroundName.pop();
      backgroundName = backgroundName.join('.');
      for (let j = 0; j < masks.length; j++) {
        let maskName = masks[j].split('/')[1].split('.');
        maskName.pop();
        maskName = maskName.join('.');
        this.imageList[i].push(
          require('@/assets/merge_mask' + (j + 1) + '/' + maskName + '_' + backgroundName + '.jpg')
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
        showIndicators: true
      });
    },
    handleCreate() {
      this.$router.push('/m/create');
    },
    handleSelect() {
      let element = this.$store.getters.getUserAgent.indexOf('MicroMessenger');
      element = element !== -1 ? document.body : document.documentElement;
      let start = element.scrollTop;
      let finish = start + this.$refs.scroll.getBoundingClientRect().top;
      let move = setInterval(function () {
        let current = element.scrollTop;
        let step = (finish - current) / 8;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (current >= finish) {
          clearInterval(move);
        } else {
          element.scrollTop = current + step;
        }
      }, 1);
      Toast.success('请点击查看大图');
    }
  },
  components: {
    NCarousel
  }
};
</script>
