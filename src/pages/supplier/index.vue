
<script setup lang="ts">
import SupplierDatatable from '@/views/pages/supplier/SupplierDatatable.vue';
import { useSupplier } from "@/store/supplier/supplier"
import { SupplierResponse } from '@/store/supplier/type';

const { dataSupplier, getListSupplier, deleteSupplier } = useSupplier()
const router = useRouter()
const dialogShowDetail = ref(false)
const dialogShowDeleteConfirmation = ref(false)
const selectedSupplier = ref<SupplierResponse | null>(null)

const headers = [
  { title: 'Nama', align: 'start', sortable: false, key: 'supplierFullName' },
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

function onUpdateSupplier(item: any) {
  router.push({
    path: `/supplier/edit/${item.value.supplierId}`
  })
}

function resetSelectedSupplier() {
  selectedSupplier.value = null
}
function onShowDetailSupplier(item: any) {
  dialogShowDetail.value = true
  selectedSupplier.value = item.value
}
function onHideDetailSupplier() {
  dialogShowDetail.value = false
  resetSelectedSupplier()
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedSupplier.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedSupplier()
}

async function onSubmitDeleteSupplier() {
  const success = await deleteSupplier(selectedSupplier.value!.supplierId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
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
      <SupplierDatatable :header="headers" :data="dataSupplier.items" @create="onCreateSupplier"
        @edit="onUpdateSupplier" @delete="onShowDeleteConfirmatin" />
    </VCol>
    <DialogDeleteConfirmation :title="'Hapus data Role (' + selectedSupplier?.supplierFullName + ')?'"
      message="Data yang sudah dihapus tidak dapat dikembalikan" :show="dialogShowDeleteConfirmation"
      @close="onCancelDelete" @submit="onSubmitDeleteSupplier" />
  </VRow>
</template>
