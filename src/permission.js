import router from '@/router'
import store from '@/store'
// 路由全局前置守卫
//会再所有路由进入之前触发
// 进行权限控制
// 调用了next 进入该路由，否则无法进入
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  //用有无token判断是否登录，登录的话
  if (token) {
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getuserInfo')
    }
    // 判断是否是登录页，若果是跳至主页
    if (to.path === '/login') return next('/')
    // 否则直接进入
    next()
  } else {
    // 未登录的话
    // 判断白名单是否包含跳转的路由
    const isCludes = whiteList.includes(to.path)
    // 若包含直接放行
    if (isCludes) return next()
    // 否则跳至登录页
    next('/login')
  }
})
