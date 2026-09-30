<script setup>
import { useRoute } from 'vue-router'
import { useUI } from '../composables/useUI'

const route = useRoute()
const { isMobileNavOpen, closeMobileNav } = useUI()
</script>

<template>
  <div v-if="isMobileNavOpen" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <!-- Backdrop with smooth transition -->
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      @click="closeMobileNav"
    ></div>

    <div class="fixed inset-y-0 left-0 max-w-full flex">
      <div class="w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50">
        <!-- Drawer Header -->
        <div class="p-4 border-b flex items-center justify-between bg-white">
          <router-link to="/" class="flex items-center gap-2" @click="closeMobileNav">
            <div class="w-8 h-8 rounded-full bg-[#0d131f] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              A
            </div>
            <span class="font-serif font-bold text-lg tracking-tight text-text-charcoal">ARTS OF SHOP</span>
          </router-link>
          <button 
            type="button"
            class="p-1 rounded-md text-gray-500 hover:text-primary transition-colors cursor-pointer" 
            @click="closeMobileNav" 
            aria-label="Close Navigation Drawer"
          >
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-4 overflow-y-auto flex-1 divide-y divide-gray-100">
          <div class="py-2 space-y-3 font-semibold text-sm">
            <router-link 
              to="/" 
              class="block transition-colors" 
              :class="route.path === '/' ? 'text-primary font-bold' : 'text-text-charcoal hover:text-primary'"
              @click="closeMobileNav"
            >
              Home
            </router-link>
            <router-link 
              to="/category" 
              class="block transition-colors"
              :class="route.path === '/category' ? 'text-primary font-bold' : 'text-text-charcoal hover:text-primary'"
              @click="closeMobileNav"
            >
              Floral Saree
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Floral Three Piece
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Hijab
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Jewellary
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Grown
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Lehenga
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Tote Bag
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Men's Panjabi
            </router-link>
            <router-link to="/category" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Kids
            </router-link>
            <router-link to="/reviews" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Customer Reviews
            </router-link>
            <router-link to="/faq" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              FAQs &amp; Help
            </router-link>
            <router-link to="/contact" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              Contact Us
            </router-link>
            <router-link to="/account" class="block text-text-charcoal hover:text-primary transition-colors" @click="closeMobileNav">
              My Account
            </router-link>
          </div>

          <div class="py-4 space-y-2 text-xs text-gray-600">
            <div class="font-bold text-gray-900 uppercase">Customer Support</div>
            <p>WhatsApp: +880 1302 694680</p>
            <p>Delivery: Nationwide & International</p>
          </div>
        </div>

        <!-- Drawer Footer with WhatsApp Action -->
        <div class="p-3 bg-gray-50 border-t text-center">
          <a 
            class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors" 
            href="https://wa.me/8801302694680?text=Hello%20Arts%20of%20Shop" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="material-symbols-outlined text-[16px]">chat</span> Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
