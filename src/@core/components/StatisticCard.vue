<script setup lang="ts">
const statisticData =
{
  title: "Total Buku",
  total: 100
}

</script>
<template>
  <VCard>
    <VCardTitle class="align-start">
      <span class="font-weight-semibold">Daftar Buku Yang Tersedia</span>
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
              {{ statisticData.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ statisticData.total }}
            </h3>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
