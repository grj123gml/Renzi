import request from '@/utils/request'
/**
 * 获取员工基本信息
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取员工详情列表
 * @param {*} params 
 * @returns 
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
