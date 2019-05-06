import Vue from 'vue';
import App from './Presentation/App.vue';
import store from './Store/store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
