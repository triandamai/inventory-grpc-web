<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: () => ""
  },
  message: {
    type: String,
    default: () => ""
  },
})

const emit = defineEmits(['close', 'submit'])

const isShow = ref(false)

watch(() => props.show, (newValue) => {
  isShow.value = newValue
})

</script>

<template>
  <VDialog v-model="isShow" persistent max-width="500px">
    <VCard>
      <VCardTitle class="text-h6">
        {{ title }}
      </VCardTitle>
      <VCardTitle class="text-h7">
        {{ message }}
      </VCardTitle>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('close')" color="green-darken-1" variant="text">
          Batal
        </VBtn>
        <VBtn @click="$emit('submit')" color="green-darken-1" variant="text">
          Lanjutkan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
