<script setup lang="ts">
import avatar1 from '@/assets/images/avatars/avatar-1.png'

const refInputEl = ref<HTMLElement>()
const avatarImg = ref(avatar1)

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
          <!-- 👉 First Name -->
          <VCol md="6" cols="12">
            <VTextField label="First Name" />
          </VCol>

          <!-- 👉 Last Name -->
          <VCol md="6" cols="12">
            <VTextField label="Last Name" />
          </VCol>

          <!-- 👉 Email -->
          <VCol cols="12" md="6">
            <VTextField label=" E-mail" type="email" />
          </VCol>

          <!-- 👉 Organization -->
          <VCol cols="12" md="6">
            <VTextField label="Organization" />
          </VCol>

          <!-- 👉 Form Actions -->
          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn>Save changes</VBtn>

            <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
              Reset
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
