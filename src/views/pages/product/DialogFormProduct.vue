<script setup lang="ts">
import { CreateNewProductRequest } from "@/store/product/type";
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import { useCategory } from '@/store/category/category';
import { CategoryResponse } from "@/store/category/type";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(["close", "submit"])

const { dataCategory, getListCategory } = useCategory()

const refInputEl = ref<HTMLElement>()
const avatarImg = ref(avatar1)
const form = ref<CreateNewProductRequest>({
  productName: "",
  productDescription: "",
  productImage: "",
  productOutboundPrice: 0,
  productInboundPrice: 0,
  productStock: 0,
  productUnit: "",
  category: []
})

const resetForm = () => {

}

// changeAvatar function
const changeAvatar = (file: any) => {
  const fileReader = new FileReader()
  const { files } = file!.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        avatarImg.value = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  avatarImg.value = avatar1
}


const isShow = ref(false)

watch(() => props.show, (newValue) => {
  isShow.value = newValue
})

onMounted(() => {
  getListCategory()
})

</script>
<template>
  <VDialog v-model="isShow" max-width="800px">
    <VCard>
      <VCardTitle>Form Category</VCardTitle>
      <VForm @submit.prevent="() => { $emit('submit', form) }">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="avatar1" />

          <!-- 👉 Upload Photo -->
          <form ref="refForm" class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                @input="(e: Event) => { }">

              <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="mdi-refresh" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.productName" label="Nama" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.productDescription" label="Deskripsi" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.productUnit" label="Satuan" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.productOutboundPrice" label="Harga Jual" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.productInboundPrice" label="Harga Beli" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VAutocomplete v-model="form.category" label="Category" chips multiple :items="dataCategory.items"
                item-title="categoryName" item-value="categoryId" />
            </VCol>
          </VRow>

        </VCardText>
        <VCardActions class="justify-end">
          <VBtn type="reset" @click="$emit('close')">
            Close
          </VBtn>
          <VBtn type="submit">
            Simpan
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>
