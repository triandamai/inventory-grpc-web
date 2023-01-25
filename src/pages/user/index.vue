<script setup lang="ts">
import { useUser } from "@/store/user/user"
const props = defineProps({})

const user = useUser()

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

onMounted(() => {
  user.getListUser()
})
</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard />
    </VCol>
    <VCol cols="12">
      <UserDatatable :header="headers" :data="user.dataUser.items" />
    </VCol>
  </VRow>
</template>
