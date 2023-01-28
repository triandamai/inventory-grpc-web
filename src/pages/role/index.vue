
<script setup lang="ts">
import { useRole } from '@/store/role/role';
import { RoleResponse } from '@/store/role/type';
import DialogShowDetailRole from '@/views/pages/role/DialogShowDetailRole.vue';
import RoleDatatable from '@/views/pages/role/RoleDatatable.vue';

const headers = [
  { title: 'Name', align: 'start', sortable: false, key: 'roleName' },
  {
    title: 'Description',
    align: 'start',
    sortable: false,
    key: 'roleDescription',
  },
  { title: 'Created At', align: 'end', sortable: false, key: 'createdAt' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

const { dataRole, getListRole, deleteRole } = useRole()
const router = useRouter()

const selectedRole = ref<RoleResponse | null>(null)
const dialogShowDetail = ref(false)
const dialogShowDeleteConfirmation = ref(false)

function resetSelectedRole() {
  selectedRole.value = null
}
function onShowDetailRole(item: any) {
  dialogShowDetail.value = true
  selectedRole.value = item.value
}
function onHideDetailRole() {
  dialogShowDetail.value = false
  resetSelectedRole()
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedRole.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedRole()
}

async function onSubmitDeleteRole() {
  const success = await deleteRole(selectedRole.value!.roleId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
}

function onEditRole(item: any) {
  router.push({
    path: `/role/edit/${item.value.roleId}`
  })
}

onMounted(() => {
  getListRole()
})

</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard title="Daftar Role Pada Aplikasi" subtitle="Jumlah Role" :total="dataRole.totalItem" />
    </VCol>
    <VCol cols="12">
      <RoleDatatable @create="router.push({ path: '/role/add' })" @show="onShowDetailRole" @edit="onEditRole"
        @delete="onShowDeleteConfirmatin" :header="headers" :data="dataRole.items" />
    </VCol>
    <DialogShowDetailRole :show="dialogShowDetail" :detail="selectedRole" @close="onHideDetailRole" />
    <DialogDeleteConfirmation :show="dialogShowDeleteConfirmation"
      :title="'Hapus data Role (' + selectedRole?.roleName + ')?'"
      message="Setelah dihapus dapat tidak dapat dikembalikan" @close="onCancelDelete" @submit="onSubmitDeleteRole" />
  </VRow>
</template>
