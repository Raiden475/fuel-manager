<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../composables/useUserStore'
import UserForm from '../../components/users/UserForm.vue'

const router = useRouter()
const route = useRoute()
const { getUserById, updateUser } = useUserStore()

// Get user id from the route params
const userId = Number(route.params.id)

// Find the user to edit
const user = computed(() => getUserById(userId))

// Handle form submission — update and go back to list
const handleSubmit = (data: { name: string; email: string }): void => {
  updateUser(userId, data)
  router.push('/users')
}
</script>

<template>
  <div>

    <!-- User not found -->
    <div v-if="!user" class="text-center py-12">
      <p class="text-gray-400 text-lg">Usuario no encontrado</p>
      <button
        @click="router.push('/users')"
        class="mt-4 text-blue-600 text-sm hover:underline"
      >
        Volver a la lista
      </button>
    </div>

    <!-- Edit form -->
    <div v-else>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Editar Usuario</h2>
        <p class="text-sm text-gray-500 mt-1">Modificá los datos de {{ user.name }}</p>
      </div>

      <UserForm
        :initial-data="{ name: user.name, email: user.email }"
        submit-label="Guardar Cambios"
        @submit="handleSubmit"
        @cancel="router.push('/users')"
      />
    </div>

  </div>
</template>
