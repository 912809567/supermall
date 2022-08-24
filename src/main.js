import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//创建用于事件总线的Vue实例
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

//使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)
