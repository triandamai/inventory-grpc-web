<script lang="ts" setup>
import DrawerCashier from './components/DrawerCashier.vue'
import { VerticalNavLayoutCashier } from '@layouts'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import DrawerCart from './components/DrawerCart.vue'
</script>

<template>
  <VerticalNavLayoutCashier>
    <!-- 👉 navbar -->
    <template #navbar>
      <VTextField rounded prepend-inner-icon="mdi-magnify" density="compact" max-width="100px"
        class="app-bar-search d-none d-sm-block" />

      <VSpacer />

      <a href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free" target="_blank"
        rel="noopener noreferrer" style="color: inherit">
        <VIcon class="ms-6 me-4" icon="mdi-github" />
      </a>
      <NavbarThemeSwitcher />
      <VBtn icon variant="text" color="default" class="me-2" size="small">
        <VIcon icon="mdi-bell-outline" size="24" />
      </VBtn>
      <UserProfile />
    </template>

    <!-- 👉 Drawer content -->
    <template #navigation-drawer-content>
      <DrawerCart />
    </template>

    <!-- 👉 Pages -->
    <div class="layout-page-content">
      <RouterView />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayoutCashier>
</template>

<style lang="scss">
.app-bar-search {
  .v-input__control {
    width: 236px
  }

  .v-field__outline__start {
    border-radius: 28px 0 0 28px !important;
    flex-basis: 20px !important;
  }

  .v-field__outline__end {
    border-radius: 0 28px 28px 0 !important;
  }
}
</style>
