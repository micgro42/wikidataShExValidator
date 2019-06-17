import Vue from 'vue';
import App from './Presentation/App.vue';
import store from './Store/store';
import VueRouter from 'vue-router';
import router from './Presentation/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
