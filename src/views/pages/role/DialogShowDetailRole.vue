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
    <v-card class="mx-auto my-12" max-width="374">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>
      <v-card-item>
        <v-card-title>{{ detail?.roleName }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">Dibuat pada {{ detail?.createdAt }}</span>

          <v-icon color="error" icon="mdi-calendar" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <div>{{ detail?.roleDescription }}.</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Yang dapat dilakukan Role ini</v-card-title>

      <div class="px-4">
        <VList class="bg-transparent">
          <VListItem v-for="(item) in groupBy(detail?.permission as PermissionResponse[], (p) => p.permissionGroup)"
            :key="item[0].permissionId" :prepend-icon="'mdi-eye'" :title="item[0].permissionName"
            :subtitle="item.map((v) => `${v.permissionType}`).join(',')" />
        </VList>
      </div>

      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="$emit('close')">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </VDialog>
</template>
