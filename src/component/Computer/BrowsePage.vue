<template>
  <el-row justify="center">
    <el-col :span="20">
      <ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <li v-for="i in displayList" :key="i">
          <el-card class="browse-line">
            <el-scrollbar>
              <div class="line-container" v-bind:class="{ active: isActive }">
                <el-image
                  v-for="j in i"
                  :key="j"
                  :src="j"
                  :preview-src-list="i"
                  :initial-index="1"
                  class="browse-image"
                />
              </div>
            </el-scrollbar>
          </el-card>
        </li>
      </ul>
      <el-backtop :bottom="50">
        <div class="up-botton">UP</div>
      </el-backtop>
    </el-col>
  </el-row>
</template>

<style scoped>
.browse-line {
  margin-top: 40px;
  padding-left: 20px;
}

.line-container {
  margin-top: 10px;
  white-space: nowrap;
  margin-bottom: 10px;
}

.active {
  overflow-y: hidden;
}

.browse-image {
  width: 200px;
  height: 200px;
  margin-top: 5px;
  margin-right: 20px;
  border-radius: 4px;
  display: inline-block;
  box-shadow: 0 2px 6px #404040;
}

.up-botton {
  width: 100%;
  height: 100%;
  color: #1989fa;
  line-height: 45px;
  text-align: center;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}
</style>

<script>
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      isActive: false,
      disabled: false,
      imageList: [],
      displayList: []
    };
  },
  created() {
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
    load() {
      if (!this.disabled) {
        if (this.displayList.length < this.imageList.length) {
          this.isActive = true;
          for (let i = 0; i < 3 && this.displayList.length < this.imageList.length; i++) {
            this.displayList.push(this.imageList[this.displayList.length]);
          }
          setTimeout(() => {
            this.isActive = false;
          }, 150);
        } else {
          ElMessage({
            message: '到底啦，更多头像正在赶来的路上~',
            type: 'warning'
          });
          this.disabled = true;
        }
      }
    }
  }
};
</script>
