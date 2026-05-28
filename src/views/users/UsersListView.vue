<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../composables/useUserStore'
import UserTable from '../../components/users/UserTable.vue'

const router = useRouter()
const { users, deleteUser } = useUserStore()

// Search filter
const search = ref('')

// Computed: filter users by name or email
const filteredUsers = computed(() =>
  users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const handleEdit = (id: number): void => {
  router.push(`/users/${id}/edit`)
}

const handleDelete = (id: number): void => {
  if (confirm('¿Seguro que querés eliminar este usuario?')) {
    deleteUser(id)
  }
}
</script>

<template>
  <div>
    <!-- Page header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Usuarios</h1>
        <p class="text-sm text-gray-400 mt-0.5">{{ users.length }} usuarios registrados</p>
      </div>
      <button
        @click="router.push('/users/new')"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span>+</span> Nuevo Usuario
      </button>
    </div>

    <!-- Search and filters bar -->
    <div class="bg-white rounded-xl border border-gray-200 mb-4 px-4 py-3 flex items-center gap-3">
      <span class="text-gray-400 text-sm">🔍</span>
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o email..."
        class="flex-1 text-sm text-gray-700 focus:outline-none bg-transparent"
      />
      <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
        {{ filteredUsers.length }} resultado{{ filteredUsers.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <!-- Users table -->
    <UserTable :users="filteredUsers" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>
