import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView,
      redirect: '/users',
      children: [
        // ── User routes ──────────────────────────────
        {
          path: 'users',
          component: () => import('../views/users/UsersListView.vue'),
        },
        {
          path: 'users/new',
          component: () => import('../views/users/UserCreateView.vue'),
        },
        {
          path: 'users/:id',
          component: () => import('../views/users/UserDetailView.vue'),
        },
        {
          path: 'users/:id/edit',
          component: () => import('../views/users/UserEditView.vue'),
        },

        // ── Truck routes ─────────────────────────────
        {
          path: 'trucks',
          component: () => import('../views/trucks/TrucksListView.vue'),
        },
        {
          path: 'trucks/new',
          component: () => import('../views/trucks/TruckCreateView.vue'),
        },
        {
          path: 'trucks/:id/edit',
          component: () => import('../views/trucks/TruckEditView.vue'),
        },

        // ── Fuel routes ──────────────────────────────
        {
          path: 'fuel/load',
          component: () => import('../views/fuel/FuelLoadView.vue'),
        },
        {
          path: 'fuel/refill',
          component: () => import('../views/fuel/TankRefillView.vue'),
        },

        // ── Records route ────────────────────────────
        {
          path: 'records',
          component: () => import('../views/records/RecordsView.vue'),
        },

        // ── Settings — NESTED ROUTES ─────────────────
        // SettingsView tiene su propio <RouterView /> adentro
        // que renderiza el hijo activo
        {
          path: 'settings',
          component: () => import('../views/settings/SettingsView.vue'),
          redirect: '/settings/general',
          children: [
            {
              path: 'general',
              component: () => import('../views/settings/GeneralView.vue'),
            },
            {
              path: 'team',
              component: () => import('../views/settings/TeamView.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
