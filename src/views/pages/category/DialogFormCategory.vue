<script setup lang="ts">
import { CreateNewCategoryRequest } from "@/store/category/type";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(["close", "submit"])

const form = ref<CreateNewCategoryRequest>({
  categoryName: "",
  categoryDescription: ""
})


const isShow = ref(false)

watch(() => props.show, (newValue) => {
  isShow.value = newValue
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
