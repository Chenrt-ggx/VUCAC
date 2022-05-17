<template>
  <div>
    <n-carousel show-arrow autoplay>
      <img class="carousel-img" v-for="item in images" :key="item" :src="item" alt="carousel-img" />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="curtom-arrow--left" @click="prev">
            <n-icon><ArrowBack /></n-icon>
          </button>
          <button type="button" class="curtom-arrow--right" @click="next">
            <n-icon><ArrowForward /></n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
    <el-row justify="center">
      <el-col :span="20">
        <el-divider class="home-card-divider">
          <router-link to="/p/create">
            <Icon size="30" color="#95de64">
              <create-icon />
            </Icon>
          </router-link>
        </el-divider>
        <el-row justify="center">
          <el-col :span="18">
            <el-card class="home-image-card">
              <router-link to="/p/create">
                <el-image :src="createSrc" class="home-image-element" />
              </router-link>
              <el-divider direction="vertical" class="home-inner-divider"></el-divider>
              <div class="home-text-div">
                <div v-for="i in createIntroduce" :key="i">
                  {{ i }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-divider class="home-card-divider">
          <router-link to="/p/browse">
            <Icon size="30" color="#b37feb">
              <browse-icon />
            </Icon>
          </router-link>
        </el-divider>
        <el-row justify="center">
          <el-col :span="18">
            <el-card class="home-image-card">
              <router-link to="/p/browse">
                <el-image :src="selectSrc" class="home-image-element" />
              </router-link>
              <el-divider direction="vertical" class="home-inner-divider"></el-divider>
              <div class="home-text-div">
                <div v-for="i in selectIntroduce" :key="i">
                  {{ i }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.carousel-img {
  width: 100%;
  object-fit: cover;
}

.custom-arrow {
  right: 25px;
  bottom: 35px;
  display: flex;
  position: absolute;
}

.custom-arrow button {
  color: #fff;
  width: 32px;
  height: 32px;
  border-width: 0;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 12px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  background-color: rgba(127, 127, 127, 0.5);
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-arrow button:hover {
  background-color: rgba(127, 127, 127, 0.3);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  margin: 0;
  padding: 0;
  left: 30px;
  bottom: 35px;
  display: flex;
  position: absolute;
}

.custom-dots li {
  width: 16px;
  height: 4px;
  margin: 0 3px;
  cursor: pointer;
  border-radius: 4px;
  display: inline-block;
  background-color: rgba(127, 127, 127, 0.5);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-dots li.is-active {
  width: 60px;
  background: #ababab;
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
  ArrowBack,
  ArrowForward,
  CreateOutline as CreateIcon,
  PlayCircleOutline as BrowseIcon
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { NCarousel, NIcon } from 'naive-ui';
import Settings from '../../settings.json';

export default {
  data() {
    return {
      images: [],
      interval: 5000,
      createIntroduce: Settings['createIntroduce'],
      selectIntroduce: Settings['selectIntroduce'],
      createSrc: require('@/assets/elements/create.jpg'),
      selectSrc: require('@/assets/elements/select.jpg')
    };
  },
  created() {
    this.images = require.context('@/assets/p_display', false).keys();
    for (let i = 0; i < this.images.length; i++) {
      this.images[i] = require('@/assets/p_display/' + this.images[i].split('/')[1]);
    }
  },
  components: {
    Icon,
    BrowseIcon,
    CreateIcon,
    ArrowBack,
    ArrowForward,
    NCarousel,
    NIcon
  }
};
</script>
