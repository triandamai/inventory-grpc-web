<script setup lang="ts">
import { usePermission } from "@/store/permission/permission"
import { useRole } from "@/store/role/role"
import { CreateRoleRequest } from "@/store/role/type"
const permission = usePermission()
const role = useRole()
const groupBy = [{ key: "permissionGroup" }]
const sortBy = [{ key: 'permissionId' }]
const header = [{
  title: 'Access', align: 'start', value: 'permissionType', groupable: false
}]
const form = reactive<CreateRoleRequest>({
  roleName: "",
  roleDescription: "",
  permission: []
})

async function onSubmit() {
  const { success, data, message } = await role.createRole(form)
}

onMounted(() => {
  permission.getListPermission()
})
// watch(() => permission.dataPermission.items, (newValue) => {
//   console.log(newValue)
// })
</script>

<template>
  <VCard title="Recent Devices">
    <VCardText>
      We need permission from your browser to show notifications.
      <a href="javascript:void(0)">Request Permission</a>
    </VCardText>
    <VCardText>
      <VRow>
        <VCol cols="12" md="3">
          <VTextField v-model="form.roleName" placeholder="Role Name" />
        </VCol>
        <VCol cols="12" md="9">
          <VTextField v-model="form.roleDescription" placeholder="Role Description" />
        </VCol>
      </VRow>
    </VCardText>

    <VCardText>
      <VDataTable :group-by="groupBy" :headers="header" :sort-by="sortBy" show-select hide-default-footer
        v-model="form.permission" :items="permission.dataPermission.items" class="elevation-0"
        item-value="permissionId" />
    </VCardText>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => { onSubmit() }">
        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Save Changes
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
