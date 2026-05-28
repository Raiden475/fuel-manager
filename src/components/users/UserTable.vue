<script setup lang="ts">
import type { User } from '../../models'
import UserRow from './UserRow.vue'

// Props: receive the full list of users from parent view
defineProps<{ users: User[] }>()

// Emits: bubble up edit and delete events to parent
const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <!-- Empty state -->
    <div v-if="users.length === 0" class="p-12 text-center">
      <p class="text-3xl mb-3">👤</p>
      <p class="text-sm font-medium text-gray-500">No se encontraron usuarios</p>
      <p class="text-xs text-gray-400 mt-1">Intentá con otro término de búsqueda</p>
    </div>

    <!-- Table -->
    <table v-else class="w-full">
      <thead>
        <tr class="border-b border-gray-100 bg-gray-50">
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            ID
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Nombre
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Email
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        <UserRow
          v-for="user in users"
          :key="user.id"
          :user="user"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
      </tbody>
    </table>

    <!-- Footer -->
    <div v-if="users.length > 0" class="px-4 py-3 border-t border-gray-100 bg-gray-50">
      <p class="text-xs text-gray-400">
        {{ users.length }} fila{{ users.length !== 1 ? 's' : '' }}
      </p>
    </div>
  </div>
</template>
