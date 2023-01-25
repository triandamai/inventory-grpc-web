<script setup lang="ts">
import { RoleResponse } from '@/store/role/type';

const props = defineProps({
  header: {
    type: Array<{
      title: string,
      align: string,
      sortable: boolean,
      key: string
    }>,
    default: []
  },
  data: {
    type: Array<RoleResponse>,
    default: []
  }
})

const emit = defineEmits(['create'])
const itemPerPage = ref(10)


</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow class="m-6">
        <VCol>
          <VBtn @click.stop="$emit('create')" variant="outlined" size="small" small>Tambah</VBtn>
        </VCol>
        <VCol>
          <VTextField label="Cari" single-line hide-details></VTextField>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>

      <VDataTable v-model:items-per-page="itemPerPage" :headers="header" :items="data" item-value="name"
        class="elevation-0">
        <template v-slot:item.action="{ item }">
          <VBtn icon="mdi-delete" variant="flat" color="primary" size="x-small" />
          <VMenu>
            <template v-slot:activator="{ props }">
              <VBtn icon="mdi-dots-vertical" v-bind="props" size="x-small" />
            </template>
            <VList :density="'compact'" :lines="'one'" nav>
              <VListItem v-for="(item, i) in [{ text: 'Edit', icon: 'mdi-folder' },
              { text: 'View', icon: 'mdi-account-multiple' }]" :key="i" :value="item" active-color="primary">
                <template v-slot:prepend>
                  <VIcon :icon="item.icon" />
                </template>
                <VListItemTitle v-text="item.text" />
              </VListItem>

            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
