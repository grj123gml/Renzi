import request from '@/utils/request'
/** 
 * 获取员工基本信息
*/
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}
