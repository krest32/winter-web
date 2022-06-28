import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"; //使用幻灯片插件
import VueQriously from "vue-qriously"; //用作微信支付
import ElementUI from "element-ui"; //element-ui的全部组件
import "element-ui/lib/theme-chalk/index.css"; //element-ui的css

Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI); //使用elementUI
Vue.use(VueQriously);
