import request from '@/utils/request'
/**
 *获取组织架构里的部门数据
 * @returns promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}

export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}
/**
 * 新增部门
 */
export function addDeptApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
