import Vue from 'vue';
import App from './App.vue';
import router from "./router/router";
import axios from "axios";
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



Vue.prototype.axios = axios;
axios.defaults.headers.common['X-Gismeteo-Token'] = '56b30cb255.3443075';

