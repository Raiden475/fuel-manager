import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '../composables/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Login route — public ─────────────────────────
    {
      path: '/login',
      component: () => import('../views/auth/LoginView.vue'),
    },

    // ── Dashboard — protected ────────────────────────
    {
      path: '/',
      component: DashboardView,
      children: [
        // Home — stats dashboard
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
        },

        // User routes — admin only
        {
          path: 'users',
          meta: { adminOnly: true },
          component: () => import('../views/users/UsersListView.vue'),
        },
        {
          path: 'users/new',
          meta: { adminOnly: true },
          component: () => import('../views/users/UserCreateView.vue'),
        },
        {
          path: 'users/:id',
          meta: { adminOnly: true },
          component: () => import('../views/users/UserDetailView.vue'),
        },
        {
          path: 'users/:id/edit',
          meta: { adminOnly: true },
          component: () => import('../views/users/UserEditView.vue'),
        },

        // Truck routes — admin only
        {
          path: 'trucks',
          meta: { adminOnly: true },
          component: () => import('../views/trucks/TrucksListView.vue'),
        },
        {
          path: 'trucks/new',
          meta: { adminOnly: true },
          component: () => import('../views/trucks/TruckCreateView.vue'),
        },
        {
          path: 'trucks/:id/edit',
          meta: { adminOnly: true },
          component: () => import('../views/trucks/TruckEditView.vue'),
        },

        // Fuel routes — all roles
        {
          path: 'fuel/load',
          component: () => import('../views/fuel/FuelLoadView.vue'),
        },
        {
          path: 'fuel/refill',
          component: () => import('../views/fuel/TankRefillView.vue'),
        },

        // Records route — all roles
        {
          path: 'records',
          component: () => import('../views/records/RecordsView.vue'),
        },

        // Settings — admin only, nested routes
        {
          path: 'settings',
          meta: { adminOnly: true },
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

// Navigation guard — protect routes based on auth and role
router.beforeEach((to) => {
  const { isAuthenticated, isAdmin } = useAuthStore()

  // Allow login page always
  if (to.path === '/login') return true

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) return '/login'

  // Redirect to home if operator tries to access admin routes
  if (to.meta.adminOnly && !isAdmin.value) return '/fuel/load'

  return true
})

export default router
