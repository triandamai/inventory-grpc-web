<script setup lang="ts">
import { usePermission } from "@/store/permission/permission"
import { useRole } from "@/store/role/role"
import { UpdateRoleRequest } from "@/store/role/type"

const route = useRoute()
const router = useRouter()
const { getListPermission, dataPermission } = usePermission()
const { getRoleById, updateRole } = useRole()
const groupBy = [{ key: "permissionGroup" }]
const sortBy = [{ key: 'permissionId' }]
const header = [{
  title: 'Access', align: 'start', value: 'permissionType', groupable: false
}]
const form = reactive<UpdateRoleRequest>({
  roleId: "",
  roleName: "",
  roleDescription: "",
  permission: []
})

async function onSubmit() {
  const { success, data, message } = await updateRole(form)
  if (success) {
    router.back()
  }
}

async function getRolesById(id: string) {
  const data = await getRoleById(id)
  if (data) {
    form.roleId = data.roleId
    form.roleDescription = data.roleDescription
    form.roleName = data.roleName
    form.permission = data.permission.map((v) => v.permissionId)
  }
}

onMounted(() => {
  getListPermission()
  getRolesById(route.params.id.toString())
})

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
        v-model="form.permission" :items="dataPermission.items" class="elevation-0" item-value="permissionId" />
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
