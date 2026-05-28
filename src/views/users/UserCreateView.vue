<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../composables/useUserStore'
import UserForm from '../../components/users/UserForm.vue'

const router = useRouter()
const { addUser } = useUserStore()

// Handle form submission — add user and go back to list
const handleSubmit = (data: { name: string; email: string }): void => {
  addUser(data)
  router.push('/users')
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Nuevo Usuario</h2>
      <p class="text-sm text-gray-500 mt-1">Completá los datos para registrar un usuario</p>
    </div>

    <!-- Reusable form component -->
    <UserForm submit-label="Crear Usuario" @submit="handleSubmit" @cancel="router.push('/users')" />
  </div>
</template>
