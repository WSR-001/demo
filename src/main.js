import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import axios from 'axios'

Vue.prototype.$video = Video;

//https://blog.csdn.net/weixin_43503080/article/details/105991793
import './assets/styles/common.scss';

// import basicContainer from 'components/basic-container/main'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.0.222:9090'; /*配置前缀URL*/
// axios.defaults.baseURL = 'http://localhost:3001';
/*使用this.$http.而不是axios.是因为this.$http.这种形式比较通用。如果不再使用axios，只需要在main.js中修改即可*/
/*无需再改页面代码*/
Vue.prototype.$http = axios;


Vue.config.productionTip = false;
Vue.use(ElementUI); //使用elementUI
Vue.use(axios);
Vue.use(VueCookies);
Vue.use(VueAwesomeSwiper);
// 注册全局容器
// Vue.component('basicContainer', basicContainer);

// // 注册全局echarts
// Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
