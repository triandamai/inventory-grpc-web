<script setup lang="ts">
import { RoleResponse } from "@/store/role/type";
import { PropType } from "vue"
import { groupBy } from "@/@core/utils/api"
import { PermissionResponse } from "@/store/permission/type";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  detail: {
    type: Object as PropType<RoleResponse | null>,
    default: null
  }
})

const emit = defineEmits(["close", "edit"])

const isShow = ref(false)

watch(() => props.show, (newValue) => {
  isShow.value = newValue
})
</script>

<template>
  <VDialog v-model="isShow">
    <VCard class="mx-auto my-12" max-width="374">
      <template v-slot:loader="{ isActive }">
        <VProgressLinear :active="isActive" color="deep-purple" height="4" indeterminate />
      </template>
      <VCardItem>
        <VCardTitle>{{ detail?.roleName }}</VCardTitle>

        <VCard-subtitle>
          <span class="me-1">Dibuat pada {{ detail?.createdAt }}</span>

          <VIcon color="error" icon="mdi-calendar" size="small" />
        </VCard-subtitle>
      </VCardItem>

      <VCard-text>
        <div>{{ detail?.roleDescription }}.</div>
      </VCard-text>

      <VDivider class="mx-4 mb-1" />

      <VCardTitle>Yang dapat dilakukan Role ini</VCardTitle>

      <div class="px-4">
        <VList class="bg-transparent">
          <VListItem v-for="(item) in groupBy(detail?.permission as PermissionResponse[], (p) => p.permissionGroup)"
            :key="item[0].permissionId" :prepend-icon="'mdi-eye'" :title="item[0].permissionName"
            :subtitle="item.map((v) => `${v.permissionType}`).join(',')" />
        </VList>
      </div>

      <VCardActions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="$emit('close')">
          Batal
        </v-btn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
