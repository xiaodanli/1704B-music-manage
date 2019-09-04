export default [
    {
        path:'/',
        redirect:'/music'
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music/')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/')
    },
    {
      path: '/registry',
      name: 'registry',
      component: () => import('../views/registry/')
    },
    {
      path: '*',
      name: '404',
      component: () => import('../views/404/')
    }
  ]