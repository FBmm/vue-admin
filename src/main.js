import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 全局指令 表单输入元素自动获取焦点
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
})

// Vue指令钩子函数测试
Vue.directive('directive-hook', {
  bind: function (el, binding, vnode) { console.log(arguments) },
  inserted: function (e) { console.log('inserted', e) },
  update: function (e) { console.log('update', e) },
  componentUpdated: function (e) { console.log('componentUpdated', e) },
  unbind: function (e) { console.log('unbind', e) }
})

// Vue指令bind函数参数测试
Vue.directive('bind-attr', {
  bind: (el, binding, vnode) => {
    el.innerHTML = JSON.stringify(binding);
  },
})

// 动态指令测试
Vue.directive('dynamic-directive', {
  bind: (el, binding, vnode) => {
    el.innerHTML = JSON.stringify(binding.value)
  },
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
