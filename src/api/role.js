import request from '@/utils/request'
/**
 * 获取角色列表
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

/**
 *  根据ID获取角色详情
 * @param {*} id 角色id
 * @returns  Promise
 */
export function getRolesInfo(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 给角色分配权限
 * @param {*} data {id,permIds}
 * @returns
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
