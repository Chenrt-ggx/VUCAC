import { createStore } from 'vuex';

export default createStore({
  state: {
    userAgent: ''
  },
  getters: {
    getUserAgent(state) {
      return state.userAgent;
    }
  },
  mutations: {
    setUserAgent(state, userAgent) {
      state.userAgent = userAgent;
    }
  }
});
