<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../composables/useAuthStore'

const router = useRouter()
const { login } = useAuthStore()

// Form fields
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Handle login form submission
const handleLogin = (): void => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Completá todos los campos'
    return
  }

  loading.value = true

  // Simulate a small delay for UX
  setTimeout(() => {
    const success = login(email.value, password.value)
    if (success) {
      router.push('/')
    } else {
      error.value = 'Email o contraseña incorrectos'
    }
    loading.value = false
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div
          class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
        >
          ⛽
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Fuel Manager</h1>
        <p class="text-sm text-gray-400 mt-1">Sistema de Gestión de Combustible</p>
      </div>

      <!-- Login card -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 class="text-base font-semibold text-gray-800 mb-5">Iniciar sesión</h2>

        <!-- Error message -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4"
        >
          {{ error }}
        </div>

        <!-- Email field -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-600 mb-1.5"> Email </label>
          <input
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            @keyup.enter="handleLogin"
            class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        <!-- Password field -->
        <div class="mb-6">
          <label class="block text-xs font-medium text-gray-600 mb-1.5"> Contraseña </label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
            class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        <!-- Submit button -->
        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full bg-green-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </div>

      <!-- Credentials hint -->
      <div class="mt-4 bg-white rounded-xl border border-gray-200 p-4">
        <p class="text-xs font-medium text-gray-500 mb-2">Credenciales de prueba:</p>
        <div class="space-y-1.5">
          <div class="flex justify-between text-xs">
            <span class="text-gray-400">Admin:</span>
            <span class="font-mono text-gray-600">admin@campo.com / admin123</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-400">Operador:</span>
            <span class="font-mono text-gray-600">operador@campo.com / op123</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
