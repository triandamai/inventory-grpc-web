
<script setup lang="ts">
import { useCategory } from '@/store/category/category';
import { CategoryResponse, CreateNewCategoryRequest, UpdateCategoryRequest } from '@/store/category/type';
import CategoryDatatable from '@/views/pages/category/CategoryDatatable.vue';
import DialogFormCategory from '@/views/pages/category/DialogFormCategory.vue';
import DialogFormUpdateCategory from '@/views/pages/category/DialogFormUpdateCategory.vue';

const headers = [
  { title: 'Name', align: 'start', sortable: false, key: 'categoryName' },
  {
    title: 'Description',
    align: 'start',
    sortable: false,
    key: 'categoryDescription',
  },
  { title: 'Created At', align: 'end', sortable: false, key: 'createdAt' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

const { dataCategory, getListCategory, createNewCategory, updateCategory, deleteCategory } = useCategory()
const router = useRouter()

const selectedCategory = ref<CategoryResponse | null>(null)
const dialogShowDeleteConfirmation = ref(false)
const dialogShowFormCategory = ref(false)
const dialogShowFormUpdateCategory = ref(false)

function onShowFormCategory() {
  dialogShowFormCategory.value = true
}

function onHideFormCategory() {
  dialogShowFormCategory.value = false
}

function onShowFormUpdateCategory(data: any) {
  dialogShowFormUpdateCategory.value = true
  selectedCategory.value = data.value
  console.log(data)
}

function onHideFormUpdateCategory() {
  dialogShowFormUpdateCategory.value = false
}


function resetSelectedCategory() {
  selectedCategory.value = null
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedCategory.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedCategory()
}

async function onSubmitDeleteCategory() {
  const success = await deleteCategory(selectedCategory.value!.categoryId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
}

async function onSubmitCreateCategory(params: CreateNewCategoryRequest) {
  const success = await createNewCategory(params)
  if (success) {
    onHideFormCategory()
  }
}

async function onSubmitUpdateCategory(params: UpdateCategoryRequest) {
  const success = await updateCategory(params)
  if (success) {
    onHideFormCategory()
  }
}


function onEditCategory(item: any) {
  router.push({
    path: `/role/edit/${item.value.roleId}`
  })
}

onMounted(() => {
  getListCategory()
})

</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard title="Daftar Category Pada Aplikasi" subtitle="Jumlah Category" :total="dataCategory.totalItem" />
    </VCol>
    <VCol cols="12">
      <CategoryDatatable @create="onShowFormCategory" @edit="onShowFormUpdateCategory" @delete="onShowDeleteConfirmatin"
        :header="headers" :data="dataCategory.items" />
    </VCol>

    <DialogDeleteConfirmation :show="dialogShowDeleteConfirmation"
      :title="'Hapus data Category (' + selectedCategory?.categoryName + ')?'"
      message="Setelah dihapus dapat tidak dapat dikembalikan" @close="onCancelDelete"
      @submit="onSubmitDeleteCategory" />
    <DialogFormCategory @close="onHideFormCategory" @submit="onSubmitCreateCategory" :show="dialogShowFormCategory" />
    <DialogFormUpdateCategory @close="onHideFormUpdateCategory" @submit="onSubmitUpdateCategory"
      :body="selectedCategory" :show="dialogShowFormUpdateCategory" />
  </VRow>
</template>
