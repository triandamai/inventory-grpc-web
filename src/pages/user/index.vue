<script setup lang="ts">
import { UserResponse } from "@/store/user/type";
import { useUser } from "@/store/user/user"
import UserDatatable from "@/views/pages/user/UserDatatable.vue";

const headers = [
  { title: 'Name', align: 'start', sortable: false, key: 'userFullName' },
  {
    title: 'Emil',
    align: 'start',
    sortable: false,
    key: 'userEmail',
  },
  { title: 'Dibuat', align: 'start', sortable: false, key: 'createdAt' },
  { title: 'Aksi', align: 'start', sortable: false, key: 'action' },
]

const { dataUser, getListUser, deleteUser } = useUser()

const selectedUser = ref<UserResponse | null>(null)
const dialogShowDetail = ref(false)
const dialogShowDeleteConfirmation = ref(false)

function resetSelectedUser() {
  selectedUser.value = {
    userId: "",
    userEmail: "",
    userFullName: "",
    createdAt: "",
    updatedAt: "",
    authProvider: "",
    image: "",
    roles: []
  }
}

function onShowDetailUser(item: any) {
  dialogShowDetail.value = true
  selectedUser.value = item.value
}

function onHideDetailUser() {
  dialogShowDetail.value = false
  resetSelectedUser()
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedUser.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedUser()
}

async function onSubmitDeleteUser() {
  const success = await deleteUser(selectedUser.value!.userId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
}

onMounted(() => {
  getListUser()
})
</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard title="Data User" subtitle="User tersedia" :total="dataUser.totalItem.toFixed()" />
    </VCol>
    <VCol cols="12">
      <UserDatatable :header="headers" :data="dataUser.items" />
    </VCol>
    <DialogDeleteConfirmation :show="dialogShowDeleteConfirmation" :title="'Hapus user (' + selectedUser?.userEmail + ') ?'"
      message="Setelah dihapus dapat tidak dapat dikembalikan" @close="onCancelDelete" @submit="onSubmitDeleteUser" />
  </VRow>
</template>
