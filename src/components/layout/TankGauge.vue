<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentLevel: number
  maxLevel: number
}>()

// Computed: percentage of tank filled
const percent = computed(() =>
  Math.round((props.currentLevel / props.maxLevel) * 100)
)

// Computed: color based on level
const barColor = computed(() => {
  if (percent.value <= 10) return 'bg-red-600'
  if (percent.value <= 30) return 'bg-orange-400'
  return 'bg-blue-500'
})

const textColor = computed(() => {
  if (percent.value <= 10) return 'text-red-600'
  if (percent.value <= 30) return 'text-orange-500'
  return 'text-blue-600'
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-1">
      <span class="text-sm font-medium text-gray-600">Nivel del tanque</span>
      <span class="text-sm font-semibold" :class="textColor">
        {{ currentLevel }}L / {{ maxLevel }}L ({{ percent }}%)
      </span>
    </div>

    <!-- Tank bar -->
    <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        class="h-4 rounded-full transition-all duration-500"
        :class="barColor"
        :style="{ width: `${percent}%` }"
      />
    </div>

    <!-- Warning messages -->
    <p v-if="percent <= 10" class="text-red-600 text-xs mt-1 font-medium">
      ⛽ Tanque casi vacío — recargá urgente
    </p>
    <p v-else-if="percent <= 30" class="text-orange-500 text-xs mt-1 font-medium">
      ⚠ Nivel bajo — considerá recargar pronto
    </p>
  </div>
</template>
