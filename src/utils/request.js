// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from './auth'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 当前请求的配置
  // console.log(config)
  if (store.state.user.token) {
    if (isTimeout()) {
      await store.dispatch('user/logout') //退出登录
      router.push('/login') //跳到登录页面
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { success, message, data } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    console.log(error)
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout') //退出登录
      router.push('/login') //跳到登录页面
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器

//判断token是否过期
function isTimeout() {
  //当前时间
  const currentTime = Date.now()
  //存token时的时间戳
  const tokenTime = getTokenTime()
  //规定过期时间（两小时）
  const timeout = 2 * 60 * 60 * 1000
  // const timeout = 3 * 1000
  return currentTime - tokenTime > timeout
}

export default service // 导出axios实例
