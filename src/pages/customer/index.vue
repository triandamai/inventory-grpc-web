
<script setup lang="ts">
import CustomerDatatable from '@/views/pages/customer/CustomerDatatable.vue';
import { useCustomer } from "@/store/customer/customer"
import { CustomerResponse } from '@/store/customer/type';
const headers = [
  { title: 'Nama', align: 'start', sortable: false, key: 'customerFullName' },
  {
    title: 'Email',
    align: 'start',
    sortable: false,
    key: 'customerEmail',
  },
  { title: 'No Telp', align: 'end', sortable: false, key: 'customerPhoneNumber' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]


const { dataCustomer, getListCustomer, deleteCustomer } = useCustomer()
const router = useRouter()
const dialogShowDetail = ref(false)
const dialogShowDeleteConfirmation = ref(false)
const selectedCustomer = ref<CustomerResponse | null>(null)



function onCreateSupplier() {
  router.push({
    path: `/customer/add`
  })
}

function onUpdateSupplier(item: any) {
  router.push({
    path: `/customer/edit/${item.value.customerId}`
  })
}

function resetSelectedSupplier() {
  selectedCustomer.value = null
}
function onShowDetailSupplier(item: any) {
  dialogShowDetail.value = true
  selectedCustomer.value = item.value
}
function onHideDetailSupplier() {
  dialogShowDetail.value = false
  resetSelectedSupplier()
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedCustomer.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedSupplier()
}

async function onSubmitDeleteSupplier() {
  const success = await deleteCustomer(selectedCustomer.value!.customerId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
}
onMounted(() => {
  getListCustomer()
})

const datas: Array<any> = []
</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard />
    </VCol>
    <VCol cols="12">
      <CustomerDatatable :header="headers" :data="dataCustomer.items" @create="onCreateSupplier"
        @edit="onUpdateSupplier" @delete="onShowDeleteConfirmatin" />
    </VCol>
    <DialogDeleteConfirmation :title="'Hapus data Customer (' + selectedCustomer?.customerFullName + ')?'"
      message="Data yang sudah dihapus tidak dapat dikembalikan" :show="dialogShowDeleteConfirmation"
      @close="onCancelDelete" @submit="onSubmitDeleteSupplier" />
  </VRow>
</template>
