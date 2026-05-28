<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '../../models'

const router = useRouter()

// Props: receive a single user to display
defineProps<{ user: User }>()

// Emits: notify parent when edit or delete is requested
const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
    <!-- User id -->
    <td class="px-4 py-3 text-sm text-gray-400">#{{ user.id }}</td>

    <!-- User name — clickable link to detail view -->
    <td
      class="px-4 py-3 text-sm font-medium text-blue-600 hover:underline cursor-pointer"
      @click="router.push(`/users/${user.id}`)"
    >
      {{ user.name }}
    </td>

    <!-- User email -->
    <td class="px-4 py-3 text-sm text-gray-600">{{ user.email }}</td>

    <!-- Action buttons -->
    <td class="px-4 py-3 flex gap-2">
      <button
        @click="emit('edit', user.id)"
        class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors"
      >
        Editar
      </button>
      <button
        @click="emit('delete', user.id)"
        class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>
