
<script setup lang="ts">

const props = defineProps({})

const headers = [
  { title: 'Cover', align: 'end', sortable: false, key: 'cover' },
  {
    title: 'Judul',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'ISBN', align: 'end', sortable: false, key: 'calories' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

const drawer = ref(false)

const datas: Array<any> = []
</script>
<template>
  <VRow>
    <VCol cols="12">
      <BookStatisticCard />
    </VCol>
    <VCol cols="12">
      <RoleDatatable @create="drawer = true" :header="headers" :data="datas" />
    </VCol>
  </VRow>
</template>
