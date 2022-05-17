<template>
  <el-row justify="center">
    <el-col :span="18">
      <el-card class="egg-text-card">
        <div class="egg-text-container">
          <div class="egg-text-content" style="font-family: Consolas, monospace">
            ______/\\\\\\\\\\\_______/\\\\\_______/\\\\\\\\\\\__/\\\\\_____/\\\____________/\\\________/\\\_____/\\\\\\\\\\\___
            _____\/////\\\///______/\\\///\\\____\/////\\\///__\/\\\\\\___\/\\\___________\/\\\_______\/\\\___/\\\/////////\\\_
            _________\/\\\_______/\\\/__\///\\\______\/\\\_____\/\\\/\\\__\/\\\___________\/\\\_______\/\\\__\//\\\______\///__
            _________\/\\\______/\\\______\//\\\_____\/\\\_____\/\\\//\\\_\/\\\___________\/\\\_______\/\\\___\////\\\_________
            _________\/\\\_____\/\\\_______\/\\\_____\/\\\_____\/\\\\//\\\\/\\\___________\/\\\_______\/\\\______\////\\\______
            _________\/\\\_____\//\\\______/\\\______\/\\\_____\/\\\_\//\\\/\\\___________\/\\\_______\/\\\_________\////\\\___
            __/\\\___\/\\\______\///\\\__/\\\________\/\\\_____\/\\\__\//\\\\\\___________\//\\\______/\\\___/\\\______\//\\\__
            _\//\\\\\\\\\_________\///\\\\\/______/\\\\\\\\\\\_\/\\\___\//\\\\\____________\///\\\\\\\\\/___\///\\\\\\\\\\\/___
            __\/////////____________\/////_______\///////////__\///_____\/////_______________\/////////_______\///////////_____
          </div>
          <el-divider class="egg-divider"></el-divider>
          <div class="egg-text-content">{{ joinInfo }}</div>
          <el-divider class="egg-divider"></el-divider>
          <ul v-infinite-scroll="load">
            <li v-for="i in items" :key="i" class="egg-text-end">
              <el-row v-for="j in 5" :key="j" justify="center">
                <el-col :span="3">
                  {{ i + ' ' + i }}
                </el-col>
                <el-col :span="3">
                  {{ i + ' ' + i }}
                </el-col>
              </el-row>
            </li>
          </ul>
          <div class="egg-text-end">
            --------------------------------------------------------------------------------
          </div>
          <div class="egg-text-end">
            ------------------------------------------------------------------------------------
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.egg-text-card {
  margin-top: 45px;
  padding-top: 0.5vw;
  padding-bottom: 1vw;
}

.egg-text-container {
  margin: 2vw;
}

.egg-text-content {
  color: #363636;
  font-size: 1vw;
  line-height: 1.1vw;
}

.egg-text-end {
  color: #363636;
  font-size: 1.1vw;
  line-height: 1.2vw;
}

.egg-divider {
  margin-top: 3.5vw;
  margin-bottom: 3.5vw;
}
</style>

<script>
import Settings from '../settings.json';

export default {
  data() {
    return {
      items: Array(5).fill('|'),
      joinInfo: Settings['joinInfo']
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    let val = this.query('k');
    let sign = this.query('s');
    if (isNaN(parseInt(val)) || isNaN(parseInt(sign))) {
      this.$router.push('/');
    }
    val = parseInt(val);
    sign = parseInt(sign);
    if ((~val ^ (val >> 1) ^ (val << 1)) !== sign) {
      this.$router.push('/');
    }
    let gap = new Date().getTime() - val;
    if (Math.abs(gap) >= 3000) {
      this.$router.push('/');
    }
  },
  methods: {
    load() {
      for (let i = 0; i < 7; i++) {
        this.items.push('|');
      }
    },
    query(key) {
      let result = this.$route.query[key];
      return result ? result.toString() : '';
    }
  }
};
</script>
