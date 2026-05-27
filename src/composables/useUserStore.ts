import { ref, computed } from 'vue'
import type { User } from '../models'

// Reactive state — initial data with 3 users as required
const users = ref<User[]>([
  { id: 1, name: 'Carlos Mendez', email: 'carlos@campo.com' },
  { id: 2, name: 'Roberto Silva', email: 'roberto@campo.com' },
  { id: 3, name: 'Ana Gutierrez', email: 'ana@campo.com' },
])

let nextId = 4

export function useUserStore() {
  // Computed: total number of registered users
  const userCount = computed(() => users.value.length)

  // Find a single user by their id
  const getUserById = (id: number): User | undefined => users.value.find((u) => u.id === id)

  // Add a new user to the list
  const addUser = (data: Omit<User, 'id'>): void => {
    users.value.push({ ...data, id: nextId++ })
  }

  // Replace an existing user's data
  const updateUser = (id: number, data: Omit<User, 'id'>): void => {
    const index = users.value.findIndex((u) => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...data, id }
    }
  }

  // Remove a user from the list
  const deleteUser = (id: number): void => {
    users.value = users.value.filter((u) => u.id !== id)
  }

  return { users, userCount, getUserById, addUser, updateUser, deleteUser }
}
