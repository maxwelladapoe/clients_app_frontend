import Vue from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

axios.defaults.baseURL='http://localhost:5024';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
