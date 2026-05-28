<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../composables/useUserStore'

const router = useRouter()
const route = useRoute()
const { getUserById } = useUserStore()

// Get user id from route params
const userId = Number(route.params.id)

// Find the user by id
const user = computed(() => getUserById(userId))
</script>

<template>
  <div>
    <!-- User not found -->
    <div v-if="!user" class="text-center py-12">
      <p class="text-gray-400 text-lg">Usuario no encontrado</p>
      <button @click="router.push('/users')" class="mt-4 text-blue-600 text-sm hover:underline">
        Volver a la lista
      </button>
    </div>

    <!-- User profile -->
    <div v-else>
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <button
          @click="router.push('/users')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Volver
        </button>
        <h2 class="text-2xl font-bold text-gray-800">Perfil de Usuario</h2>
      </div>

      <!-- Profile card -->
      <div class="bg-white rounded-xl shadow p-6 max-w-md">
        <!-- Avatar -->
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ user.name }}</h3>
            <p class="text-sm text-gray-500">ID #{{ user.id }}</p>
          </div>
        </div>

        <!-- User data -->
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-400 text-sm w-16">Nombre</span>
            <span class="text-gray-800 text-sm font-medium">{{ user.name }}</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-400 text-sm w-16">Email</span>
            <span class="text-gray-800 text-sm font-medium">{{ user.email }}</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span class="text-gray-400 text-sm w-16">ID</span>
            <span class="text-gray-800 text-sm font-medium">{{ user.id }}</span>
          </div>
        </div>

        <!-- Edit button -->
        <button
          @click="router.push(`/users/${user.id}/edit`)"
          class="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Editar Usuario
        </button>
      </div>
    </div>
  </div>
</template>
