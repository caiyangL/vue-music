import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index.js';

import axios from 'axios';
import vueLazy from 'vue-lazyload';

import 'common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(vueLazy, {
  loading: require('common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
