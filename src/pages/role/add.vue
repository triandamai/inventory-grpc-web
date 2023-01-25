<script setup lang="ts">
import { listRolePermission, defaultArray } from "@/@core/utils/menu"


const selected = ref<Array<{
  code: number,
  read: number,
  write: number
}>>(defaultArray)

function assignRead(index: number) {
  selected.value[index].read = selected.value[index].read == 774 ? 775 : 774
}
function assignWrite(index: number) {
  selected.value[index].write = selected.value[index].write == 774 ? 775 : 774
}

function onClick() {
  selected.value.map(v => {
    console.log(v)
  })
}

function onReset() {
  console.log("a")
  selected.value = defaultArray
}
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
          <VTextField placeholder="Role Name" />
        </VCol>
        <VCol cols="12" md="9">
          <VTextField placeholder="Role Description" />
        </VCol>
      </VRow>
    </VCardText>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            Permission
          </th>
          <th scope="col">
            READ
          </th>
          <th scope="col">
            WRITE
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(permission, index) in listRolePermission" :key="permission.code">
          <td>
            {{ permission.name }}
          </td>
          <td>
            <VCheckbox @change="assignRead(index)" :model-value="selected[index].read" :value="774" />
          </td>
          <td>
            <VCheckbox @change="assignWrite(index)" :model-value="selected[index].write" :value="774" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => { onClick() }">
        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Save Changes
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
