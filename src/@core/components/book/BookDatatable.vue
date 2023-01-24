<script setup lang="ts">
import { Book } from '@/store/book/type';

const props = defineProps({
  header: {
    type: Array<{
      title: string,
      align: string,
      sortable: boolean,
      key: string
    }>,
    default: []
  },
  data: {
    type: Array<Book>,
    default: []
  }
})
const itemPerPage = ref(10)

</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow class="m-6">
        <VCol>
          <VBtn variant="outlined" size="small" small>Tambah</VBtn>
        </VCol>
        <VCol>
          <VTextField label="Cari" single-line hide-details></VTextField>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>

      <VDataTable v-model:items-per-page="itemPerPage" :headers="header" :items="data" item-value="name"
        class="elevation-0"></VDataTable>
    </VCardText>
  </VCard>
</template>
