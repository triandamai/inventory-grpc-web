
<script setup lang="ts">
import { useBook } from '@/store/book/book';
import { Book } from '@/store/book/type';

const props = defineProps({})

const book = useBook()

function getBooks() {
  book.getListBook()
}

onMounted(() => {
  getBooks()
})

const headers = [
  { title: 'Cover', align: 'end', sortable: false, key: 'cover' },
  {
    title: 'Judul',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'ISBN', align: 'end', sortable: false, key: 'calories' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

const datas: Array<Book> = []
</script>
<template>
  <VRow>
    <VCol cols="12">
      <BookStatisticCard />
    </VCol>
    <VCol cols="12">
      <BookDatatable :header="headers" :data="datas" />
    </VCol>
  </VRow>
</template>
