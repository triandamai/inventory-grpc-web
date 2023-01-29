<script setup lang="ts">
import { CategoryResponse, UpdateCategoryRequest } from "@/store/category/type";
import { PropType } from "vue"
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  body: {
    type: Object as PropType<CategoryResponse | null>,
    default: null
  }
})

defineEmits(["close", "submit"])

const form = ref<UpdateCategoryRequest>({
  categoryId: "",
  categoryName: "",
  categoryDescription: ""
})


const isShow = ref(false)

watch(() => props.show, (newValue) => {
  isShow.value = newValue
})

watch(() => props.body, (newValue) => {
  if (newValue) {
    form.value = {
      categoryId: newValue.categoryId,
      categoryName: newValue.categoryName,
      categoryDescription: newValue.categoryDescription
    }
  }
})
</script>
<template>
  <VDialog v-model="isShow" max-width="600px">
    <VCard>
      <VCardTitle>Form Category</VCardTitle>
      <VForm @submit.prevent="() => { $emit('submit', form) }">
        <VCardText>

          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.categoryName" label="Nama" placeholder="First Name" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.categoryDescription" label="Deskripsi" placeholder="First Name" />
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
