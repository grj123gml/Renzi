import { login, getUserInfo, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    //获取token
    setToken(state, payload) {
      state.token = payload
    },
    //获取用户信息
    setuserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    async getuserInfo(context) {
      //获取用户基本信息
      const userBaseInfo = await getUserInfo()
      // 获取用户详细信息
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setuserInfo', { ...userBaseInfo, ...userInfo })
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit(' setuserInfo', {})
    }
  }
}
