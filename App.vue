<script setup>
import TheNavbar from './components/TheNavbar.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import CartDrawer from './components/CartDrawer.vue'
import TheFooter from './components/TheFooter.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
import ToastNotification from './components/ToastNotification.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas-cream text-text-charcoal font-body-md selection:bg-crimson-subtle selection:text-primary">
    <!-- Header -->
    <TheNavbar />

    <!-- Mobile Drawer -->
    <MobileDrawer />

    <!-- Cart Slide-Over Drawer -->
    <CartDrawer />

    <!-- Dynamic Toast Notification -->
    <ToastNotification />

    <!-- Main View (Router Outlet) -->
    <div class="flex-1 flex flex-col">
      <router-view />
    </div>

    <!-- Global Footer -->
    <TheFooter />

    <!-- Floating Stylist WhatsApp -->
    <FloatingWhatsApp />
  </div>
</template>

<style>
/* App-level global transitions */
</style>
