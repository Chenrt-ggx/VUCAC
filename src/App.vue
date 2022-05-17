<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<script>
import Settings from './settings.json';

export default {
  name: 'App',
  data() {
    return {
      timer: false,
      screenWidth: document.documentElement.clientWidth
    };
  },
  created() {
    console.log('\n---------------------------------------------------------------\n\n');
    const text = Settings['consoleText'];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '') {
        console.log('\n');
      } else {
        console.log(text[i]);
      }
    }
    console.log('\n---------------------------------------------------------------\n\n');
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  watch: {
    screenWidth() {
      if (!this.timer) {
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
          location.reload();
        }, 800);
      }
    }
  }
};
</script>
