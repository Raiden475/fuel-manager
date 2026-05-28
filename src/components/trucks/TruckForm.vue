<script setup lang="ts">
import { ref } from 'vue'
import type { Truck } from '../../models'

// Props: receive existing truck data when editing
const props = defineProps<{
  initialData?: Omit<Truck, 'id'>
  submitLabel?: string
}>()

// Emits: notify parent when form is submitted or cancelled
const emit = defineEmits<{
  submit: [data: Omit<Truck, 'id'>]
  cancel: []
}>()

// Reactive form fields
const plate = ref(props.initialData?.plate ?? '')
const model = ref(props.initialData?.model ?? '')
const brand = ref(props.initialData?.brand ?? '')

// Validation errors
const errors = ref({ plate: '', model: '', brand: '' })

// Validate all fields
const validate = (): boolean => {
  errors.value.plate = plate.value.trim() ? '' : 'La patente es obligatoria'
  errors.value.model = model.value.trim() ? '' : 'El modelo es obligatorio'
  errors.value.brand = brand.value.trim() ? '' : 'La marca es obligatoria'
  return !errors.value.plate && !errors.value.model && !errors.value.brand
}

// Handle form submission
const handleSubmit = (): void => {
  if (!validate()) return
  emit('submit', {
    plate: plate.value.trim().toUpperCase(),
    model: model.value.trim(),
    brand: brand.value.trim(),
  })
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 max-w-md w-full">
    <!-- Plate field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Patente</label>
      <input
        v-model="plate"
        type="text"
        placeholder="Ej: AC123BB"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.plate" class="text-red-500 text-xs mt-1">{{ errors.plate }}</p>
    </div>

    <!-- Brand field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
      <input
        v-model="brand"
        type="text"
        placeholder="Ej: Ford"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.brand" class="text-red-500 text-xs mt-1">{{ errors.brand }}</p>
    </div>

    <!-- Model field -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
      <input
        v-model="model"
        type="text"
        placeholder="Ej: Ranger"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="errors.model" class="text-red-500 text-xs mt-1">{{ errors.model }}</p>
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
