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

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
