<script setup lang="ts">

import logo from '@/assets/logo_rail.svg?raw'

import { useTheme } from 'vuetify'
import { menuCashier } from "@/@core/utils/menu"

</script>

<template>
  <VListItem nav class="justify-center py-4" min-height="7vh">
  </VListItem>

  <VDivider></VDivider>
  <VList min-height="100vh" density="compact" nav>
    <VListItem v-for="(item, index) in menuCashier" :key="item.path" :prepend-icon="item.icon!" :title="item.title"
      :value="item.path" />
  </VList>

</template>

<style lang="scss">
.upgrade-banner {
  margin-top: auto;
}
</style>
