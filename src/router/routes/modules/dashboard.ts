import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '物业管理系统',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        locale: '主页',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'building',
      name: 'building',
      component: () => import('@/views/building/index.vue'),
      meta: {
        locale: '住宅信息',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'payment',
      name: 'payment',
      component: () => import('@/views/payment/index.vue'),
      meta: {
        locale: '缴费记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'complaint',
      name: 'complaint',
      component: () => import('@/views/complaint/index.vue'),
      meta: {
        locale: '住户反馈',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'declaration',
      name: 'declaration',
      component: () => import('@/views/declaration/index.vue'),
      meta: {
        locale: '设施维修单',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
