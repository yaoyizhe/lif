import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import content from './components/content'
Vue.component("comment-content",content);

import textarea from './components/textarea'
Vue.component("comment-textarea",textarea);

import axios from 'axios'
Vue.prototype.axios = axios;

import waterfall from 'vue-waterfall2'
Vue.use(waterfall);

import { Tab, Tabs ,List} from 'vant';
Vue.use(Tab).use(Tabs).use(List);

import qs from 'qs'
Vue.prototype.qs = qs;

Vue.config.productionTip = false

import MintUI from "mint-ui";

//导入Mint UI样式表文件
import "mint-ui/lib/style.min.css";

//通过Vue.use()方法使用Mint UI插件
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
