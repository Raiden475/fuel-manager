import { ref, computed } from 'vue'
import type { AuthUser } from '../models'

// Predefined users for login — no database needed
const authUsers: AuthUser[] = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@campo.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Operador',
    email: 'operador@campo.com',
    password: 'op123',
    role: 'operator',
  },
]

// Reactive current session — null means not logged in
const currentUser = ref<AuthUser | null>(null)

export function useAuthStore() {
  // Computed: true if user is logged in
  const isAuthenticated = computed(() => currentUser.value !== null)

  // Computed: true if current user is admin
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  // Computed: true if current user is operator
  const isOperator = computed(() => currentUser.value?.role === 'operator')

  // Attempt login — returns true if credentials match
  const login = (email: string, password: string): boolean => {
    const found = authUsers.find((u) => u.email === email && u.password === password)
    if (found) {
      currentUser.value = found
      return true
    }
    return false
  }

  // Clear current session
  const logout = (): void => {
    currentUser.value = null
  }

  return { currentUser, isAuthenticated, isAdmin, isOperator, login, logout }
}
