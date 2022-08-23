import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees' //用来和后端权限做约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: 'employees', icon: 'people' },
      name: 'employees'
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      meta: { title: '员工', icon: 'people' },
      hidden: true
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'), // 按需加载
      hidden: true,
      meta: {
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }
  ]
}
