
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

const role = useRole()
const router = useRouter()

const detailRole = ref<RoleResponse | null>(null)
const dialogShowDetail = ref(false)


function onShow(item: any) {
  dialogShowDetail.value = true
  detailRole.value = item.value
}
function onHide() {
  dialogShowDetail.value = false
  detailRole.value = {
    roleId: "",
    roleName: "",
    roleDescription: "",
    permission: [],
    createdAt: "",
    updatedAt: ""
  }
}

function onEdit(item: any) {
  router.push({
    path: `/role/edit/${item.value.roleId}`
  })
}

onMounted(() => {
  role.getListRole()
})

</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard title="Daftar Role Pada Aplikasi" subtitle="Jumlah Role"
        :total="role.dataRole.totalItem.toString()" />
    </VCol>
    <VCol cols="12">
      <RoleDatatable @create="router.push({ path: '/role/add' })" @edit="onEdit" :header="headers"
        :data="role.dataRole.items" @show="onShow" />
    </VCol>
    <DialogShowDetailRole :show="dialogShowDetail" :detail="detailRole" @close="onHide" />
  </VRow>
</template>
