<script setup>
import { useCart } from '../composables/useCart'

const { toastMessage } = useCart()
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="toastMessage" 
      class="fixed top-20 right-4 z-50 max-w-sm bg-[#0d131f] text-white border border-[#ba1a2e] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
      role="alert"
    >
      <span class="material-symbols-outlined text-[#25D366] text-[20px]">check_circle</span>
      <span class="text-xs font-medium">{{ toastMessage }}</span>
      <button 
        type="button" 
        @click="toastMessage = ''" 
        class="text-gray-400 hover:text-white ml-auto"
        aria-label="Close notification"
      >
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  </transition>
</template>
