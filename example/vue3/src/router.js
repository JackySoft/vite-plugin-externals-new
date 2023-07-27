import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo.vue'),
    },
  ],
});
export default router;
