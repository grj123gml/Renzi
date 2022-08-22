import router, { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [], //我们自己维护的路由规则，包含静态+帅选后的动态
    points: [] //按钮权限
  },
  mutations: {
    setRouters(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      // 筛选权限路由
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRouters', routes)
      context.commit('setPoints', roles.points)
      // 动态添加路由
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
