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
import * as directives from '@/directives'
// 引入自己封装的组件
import components from './components'
Vue.use(components)
// 打印
import Print from 'vue-print-nb'
Vue.use(Print)

// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

import * as filters from '@/filters'
// 自定义过滤器指令
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// 时间过滤器
// Vue.filter('formatTime', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

// 注册 ElementUI
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

//自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}

// 关闭上线环境提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
