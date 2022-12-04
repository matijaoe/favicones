<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const color = useVModel(props, 'modelValue', emit)

const colorInput = ref<HTMLInputElement>()
</script>

<template>
  <div
    flex items-center relative rounded-full overflow-hidden w-10 h-10 shrink-0
    :style="{ background: color }"
  >
    <input
      ref="colorInput"
      v-model="color"
      absolute
      inset-0
      h-full
      opacity-0
      class="select-none"
      type="color"
      placeholder="Choose color"
      aria-label="Choose color"
      rounded-full
    >
  </div>
</template>
