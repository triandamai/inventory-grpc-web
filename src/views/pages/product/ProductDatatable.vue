<script setup lang="ts">
import { ProductResponse } from '@/store/product/type';

defineProps({
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
    type: Array<ProductResponse>,
    default: []
  }
})

defineEmits(['create', 'edit', 'delete', 'show'])
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
          <VBtn icon="mdi-delete" @click="$emit('delete', item)" variant="flat" color="primary" size="x-small" />
          <VMenu>
            <template v-slot:activator="{ props }">
              <VBtn icon="mdi-dots-vertical" v-bind="props" size="x-small" />
            </template>
            <VList :density="'compact'" :lines="'one'" nav>
              <VListItem active-color="primary" @click="$emit('show', item)">
                <template v-slot:prepend>
                  <VIcon icon="mdi-eye" />
                </template>
                <VListItemTitle>Show </VListItemTitle>
              </VListItem>
              <VListItem active-color="primary" @click="$emit('edit', item)">
                <template v-slot:prepend>
                  <VIcon icon="mdi-folder" />
                </template>
                <VListItemTitle>Edit</VListItemTitle>
              </VListItem>

            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
