<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../composables/useUserStore'
import UserTable from '../../components/users/UserTable.vue'

const router = useRouter()
const { users, deleteUser } = useUserStore()

// Navigate to edit view when edit is requested
const handleEdit = (id: number): void => {
  router.push(`/users/${id}/edit`)
}

// Delete user directly from the list
const handleDelete = (id: number): void => {
  if (confirm('¿Seguro que querés eliminar este usuario?')) {
    deleteUser(id)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Usuarios</h2>
        <p class="text-sm text-gray-500 mt-1">{{ users.length }} usuarios registrados</p>
      </div>
      <button
        @click="router.push('/users/new')"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        + Nuevo Usuario
      </button>
    </div>

    <!-- Users table component -->
    <UserTable :users="users" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>
