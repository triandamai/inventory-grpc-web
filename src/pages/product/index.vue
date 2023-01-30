
<script setup lang="ts">
import { useProduct } from '@/store/product/product';
import { ProductResponse, CreateNewProductRequest, UpdateProductRequest } from '@/store/product/type';
import ProductDatatable from '@/views/pages/product/ProductDatatable.vue';
import DialogFormProduct from '@/views/pages/product/DialogFormProduct.vue';
import DialogFormUpdateProduct from '@/views/pages/product/DialogFormUpdateProduct.vue';

const headers = [
  { title: 'Name', align: 'start', sortable: false, key: 'productName' },
  {
    title: 'Description',
    align: 'start',
    sortable: false,
    key: 'productDescription',
  },
  { title: 'Created At', align: 'end', sortable: false, key: 'createdAt' },
  { title: 'Aksi', align: 'end', sortable: false, key: 'action' },
]

const { dataProduct, getListProduct, createNewProduct, updateProduct, deleteProduct } = useProduct()

const selectedProduct = ref<ProductResponse | null>(null)
const dialogShowDeleteConfirmation = ref(false)
const dialogShowFormProduct = ref(false)
const dialogShowFormUpdateProduct = ref(false)

function onShowFormProduct() {
  dialogShowFormProduct.value = true
}

function onHideFormProduct() {
  dialogShowFormProduct.value = false
}

function onShowFormUpdateProduct(data: any) {
  dialogShowFormUpdateProduct.value = true
  selectedProduct.value = data.value
}

function onHideFormUpdateProduct() {
  dialogShowFormUpdateProduct.value = false
}


function resetSelectedProduct() {
  selectedProduct.value = null
}

function onShowDeleteConfirmatin(item: any) {
  dialogShowDeleteConfirmation.value = true
  selectedProduct.value = item.value
}

function onCancelDelete() {
  dialogShowDeleteConfirmation.value = false
  resetSelectedProduct()
}

async function onSubmitDeleteProduct() {
  const success = await deleteProduct(selectedProduct.value!.productId)

  dialogShowDeleteConfirmation.value = false
  if (success) {

  }
}

async function onSubmitCreateProduct(params: CreateNewProductRequest) {
  const success = await createNewProduct(params)
  if (success) {
    onHideFormProduct()
  }
}

async function onSubmitUpdateProduct(params: UpdateProductRequest) {
  const success = await updateProduct(params)
  if (success) {
    onHideFormProduct()
  }
}


onMounted(() => {
  getListProduct()
})

</script>
<template>
  <VRow>
    <VCol cols="12">
      <StatisticCard title="Daftar Product Pada Aplikasi" subtitle="Jumlah Product" :total="dataProduct.totalItem" />
    </VCol>
    <VCol cols="12">
      <ProductDatatable @create="onShowFormProduct" @edit="onShowFormUpdateProduct" @delete="onShowDeleteConfirmatin"
        :header="headers" :data="dataProduct.items" />
    </VCol>

    <DialogDeleteConfirmation :show="dialogShowDeleteConfirmation"
      :title="'Hapus data Product (' + selectedProduct?.productName + ')?'"
      message="Setelah dihapus dapat tidak dapat dikembalikan" @close="onCancelDelete"
      @submit="onSubmitDeleteProduct" />
    <DialogFormProduct @close="onHideFormProduct" @submit="onSubmitCreateProduct" :show="dialogShowFormProduct" />
    <DialogFormUpdateProduct @close="onHideFormUpdateProduct" @submit="onSubmitUpdateProduct" :body="selectedProduct"
      :show="dialogShowFormUpdateProduct" />
  </VRow>
</template>
