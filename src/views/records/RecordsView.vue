<script setup lang="ts">
import RecordRow from '../../components/fuel/RecordRow.vue'
import TankGauge from '../../components/layout/TankGauge.vue'
import { useFuelStore } from '../../composables/useFuelStore'

const { records, currentLevel, TANK_MAX } = useFuelStore()
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-1">Historial</h2>
    <p class="text-sm text-gray-500 mb-6">Registro completo de cargas y recargas del tanque.</p>

    <!-- Tank gauge -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <TankGauge :current-level="currentLevel" :max-level="TANK_MAX" />
    </div>

    <!-- Empty state -->
    <div
      v-if="records.length === 0"
      class="text-center py-12 text-gray-400 text-sm"
    >
      No hay registros todavía.
    </div>

    <!-- Records table -->
    <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full text-left">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Litros</th>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Chofer / Patente</th>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kilometraje</th>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nivel tanque</th>
            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <RecordRow
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
