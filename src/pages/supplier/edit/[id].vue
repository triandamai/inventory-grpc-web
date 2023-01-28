<script setup lang="ts">
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import { useSupplier } from '@/store/supplier/supplier';
import { UpdateSupplierRequest } from '@/store/supplier/type';

const { updateSupplier, getSupplierById } = useSupplier()
const router = useRouter()
const route = useRoute()

const refInputEl = ref<HTMLElement>()
const avatarImg = ref(avatar1)
const isPasswordVisible = ref(false)

const form = ref<UpdateSupplierRequest>({
  supplierId: "",
  supplierEmail: "",
  supplierAddress: "",
  supplierFullName: "",
  supplierOrgName: "",
  supplierPhoneNumber: ""
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

async function getDetail(supplierId: string) {
  const { success, data } = await getSupplierById(supplierId)
  if (success) {
    form.value = {
      supplierId: data!.supplierId,
      supplierEmail: data!.supplierEmail,
      supplierFullName: data!.supplierFullName,
      supplierAddress: data!.supplierAddress,
      supplierOrgName: data!.supplierOrgName,
      supplierPhoneNumber: data!.supplierPhoneNumber
    }

  }
}

async function onSubmit() {
  const { success } = await updateSupplier(form.value)
  if (success) {
    router.back()
  }
}

onMounted(() => {
  if (route.params.id) {
    getDetail(route.params.id.toString())
  }
})
</script>

<template>
  <VCard title="Account Details">
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

    <VDivider />

    <VCardText>
      <!-- 👉 Form -->
      <VForm class="mt-6">
        <VRow>
          <!-- 👉 Full Name -->
          <VCol md="6" cols="12">
            <VTextField v-model="form.supplierFullName" label="Full Name" />
          </VCol>

          <!-- 👉 Email -->
          <VCol md="6" cols="12">
            <VTextField v-model="form.supplierEmail" label="E-Mail" type="email" />
          </VCol>

          <!-- 👉 Phone -->
          <VCol cols="12" md="6">
            <VTextField v-model="form.supplierPhoneNumber" label="Phone Number" />
          </VCol>

          <!-- 👉 Organization-->
          <VCol cols=" 12" md="6">
            <VTextField v-model="form.supplierOrgName" label="Organization" />
          </VCol>

          <!-- 👉 Organization-->
          <VCol cols=" 12" md="6">
            <VTextField v-model="form.supplierAddress" label="Address" />
          </VCol>

          <!-- 👉 Form Actions -->
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn @click="onSubmit">Save changes</VBtn>

            <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
              Reset
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
