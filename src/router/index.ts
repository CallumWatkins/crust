import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: () => import('../views/RootView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'room/:id',
        name: 'Room',
        component: () => import('../views/RoomView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
