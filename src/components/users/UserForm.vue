<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '../../models'

// Props: receive existing user data when editing
const props = defineProps<{
  initialData?: Omit<User, 'id'>
  submitLabel?: string
}>()

// Emits: notify parent when form is submitted or cancelled
const emit = defineEmits<{
  submit: [data: Omit<User, 'id'>]
  cancel: []
}>()

// Reactive form fields — use initialData if editing
const name = ref(props.initialData?.name ?? '')
const email = ref(props.initialData?.email ?? '')

// Form validation errors
const errors = ref({ name: '', email: '' })

// Validate all fields before submitting
const validate = (): boolean => {
  errors.value.name = name.value.trim() ? '' : 'El nombre es obligatorio'
  errors.value.email = email.value.includes('@') ? '' : 'Email invalido'
  return !errors.value.name && !errors.value.email
}

// Handle form submission
const handleSubmit = (): void => {
  if (!validate()) return
  emit('submit', { name: name.value.trim(), email: email.value.trim() })
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 max-w-md w-full">

    <!-- Name field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Nombre completo
      </label>
      <input
        v-model="name"
        type="text"
        placeholder="Ej: Carlos Mendez"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
    </div>

    <!-- Email field -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Correo electronico
      </label>
      <input
        v-model="email"
        type="email"
        placeholder="Ej: carlos@campo.com"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
    </div>

    <!-- Action buttons -->
    <div class="flex gap-3">
      <button
        @click="handleSubmit"
        class="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        {{ submitLabel ?? 'Guardar' }}
      </button>
      <button
        @click="emit('cancel')"
        class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        Cancelar
      </button>
    </div>

  </div>
</template>
