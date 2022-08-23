import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: {
    id: 'settings' //用来和后端权限做约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: { title: 'settings', icon: 'setting' },
      name:'settings'
    }
  ]
}
