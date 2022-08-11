import request from '@/utils/request'
/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function getRoleListApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 添加角色
 * @param {*} data
 * @returns
 */
export function getAddRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfoApi(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
