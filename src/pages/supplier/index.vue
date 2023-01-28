
<script setup lang="ts">
import SupplierDatatable from '@/views/pages/supplier/SupplierDatatable.vue';
import { useSupplier } from "@/store/supplier/supplier"

const { dataSupplier, getListSupplier } = useSupplier()
const router = useRouter()

const headers = [
  { title: 'Nama', align: 'end', sortable: false, key: 'supplierFullName' },
  {
    title: 'Email',
    align: 'start',
    sortable: false,
    key: 'supplierEmail',
  },
  { title: 'No Telp', align: 'end', sortable: false, key: 'supplierPhoneNumber' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

function onCreateSupplier() {
  router.push({
    path: `/supplier/add`
  })
}

onMounted(() => {
  getListSupplier()
})

const datas: Array<any> = []
</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard />
    </VCol>
    <VCol cols="12">
      <SupplierDatatable :header="headers" :data="dataSupplier.items" @create="onCreateSupplier" />
    </VCol>
  </VRow>
</template>
