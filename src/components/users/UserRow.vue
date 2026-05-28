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
  <tr class="hover:bg-gray-50 transition-colors group">
    <!-- ID -->
    <td class="px-4 py-3 text-xs text-gray-400 font-mono">#{{ user.id }}</td>

    <!-- Name with avatar — clickable -->
    <td class="px-4 py-3">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.push(`/users/${user.id}`)">
        <div
          class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0"
        >
          {{ user.name.charAt(0) }}
        </div>
        <div>
          <p class="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
            {{ user.name }}
          </p>
          <p class="text-xs text-gray-400">@{{ user.name.toLowerCase().replace(' ', '') }}</p>
        </div>
      </div>
    </td>

    <!-- Email -->
    <td class="px-4 py-3 text-sm text-gray-500">{{ user.email }}</td>

    <!-- Actions -->
    <td class="px-4 py-3">
      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          @click="emit('edit', user.id)"
          class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
        >
          Editar
        </button>
        <button
          @click="emit('delete', user.id)"
          class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </td>
  </tr>
</template>
