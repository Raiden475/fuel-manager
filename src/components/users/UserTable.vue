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
  <div class="bg-white rounded-xl shadow overflow-hidden">
    <!-- Empty state -->
    <div v-if="users.length === 0" class="p-8 text-center text-gray-400">
      <p class="text-4xl mb-2">👤</p>
      <p class="text-sm">No hay usuarios registrados</p>
    </div>

    <!-- Users table -->
    <table v-else class="w-full">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500">ID</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500">Nombre</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500">Email</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- UserRow is the grandchild component -->
        <UserRow
          v-for="user in users"
          :key="user.id"
          :user="user"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
      </tbody>
    </table>
  </div>
</template>
