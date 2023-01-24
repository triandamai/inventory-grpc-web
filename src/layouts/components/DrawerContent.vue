<script setup lang="ts">
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'
import { menus } from "@/@core/utils/menu"

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? upgradeBannerLight
    : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink to="/" class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          Materio
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <template v-for="(item, index) in menus">
      <VerticalNavLink v-if="item.type == 'link'" :item="{
        title: item.title,
        to: item.path,
        icon: { icon: item.icon }
      }" />
      <VerticalNavSectionTitle v-if="item.type == 'divider'" :item="{ heading: item.title }" />
    </template>
  </ul>

  <!-- 👉 illustration -->
  <a href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template" target="_blank"
    rel="noopener noreferrer">
    <img :src="upgradeBanner" alt="upgrade-banner" transition="scale-transition" class="upgrade-banner mx-auto"
      style="max-width: 230px">
  </a>
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
