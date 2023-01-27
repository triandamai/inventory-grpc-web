<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: () => ""
  },
  subtitle: {
    type: String,
    default: () => ""
  },
  total: {
    type: Number,
    default: 0
  }
})

</script>
<template>
  <VCard>
    <VCardTitle class="align-start">
      <span class="font-weight-semibold">{{ title }}</span>
      <VSpacer />
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="6" md="6" class="d-flex align-center">
          <VAvatar size="44" color="success" rounded class="elevation-1">
            <VIcon dark color="white" icon="mdi-label-outline" />
          </VAvatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ subtitle }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ total }}
            </h3>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
