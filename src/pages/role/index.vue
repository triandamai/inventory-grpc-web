
<script setup lang="ts">
import { useRole } from '@/store/role/role';
import RoleDatatable from '@/views/pages/role/RoleDatatable.vue';


const props = defineProps({})

const role = useRole()
const router = useRouter()

const headers = [
  { title: 'Name', align: 'end', sortable: false, key: 'roleName' },
  {
    title: 'Description',
    align: 'start',
    sortable: false,
    key: 'roleDescription',
  },
  { title: 'Created At', align: 'end', sortable: false, key: 'createdAt' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

onMounted(() => {
  role.getListRole()
})

</script>
<template>
  <VRow>
    <VCol cols="12">
      <BookStatisticCard />
    </VCol>
    <VCol cols="12">
      <RoleDatatable @create="router.push({path:'/role/add'})" :header="headers" :data="role.dataRole.items" />
    </VCol>
  </VRow>
</template>
