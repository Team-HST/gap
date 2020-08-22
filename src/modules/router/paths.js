export default [
  {
      path: '/',
      name: 'MainView',
      component: () => import('@/views/MainView')
  },
  {
    path: '/visualizer',
    name: 'VisualizerView',
    component: () => import('@/views/VisualizerView'),
    props: (route) => ({
      ...route.params
    })
  }
]