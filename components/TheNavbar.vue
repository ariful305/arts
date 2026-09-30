<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useUI } from '../composables/useUI'

const route = useRoute()
const router = useRouter()
const { itemCount, itemsSubtotal } = useCart()
const { toggleMobileNav, searchQuery, openCartDrawer } = useUI()

const formattedSubtotal = computed(() => {
  return `৳ ${itemsSubtotal.value.toLocaleString('en-US')}.00`
})

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/category', query: { q: searchQuery.value } })
  } else {
    router.push('/category')
  }
}
</script>

<template>
  <header class="sticky top-0 left-0 right-0 w-full z-50 bg-surface-card/95 backdrop-blur-md shadow-[0_12px_32px_-4px_rgba(26,26,26,0.06)]">
    <!-- Top Utility Bar (Dark Navy/Black) -->
    <div class="w-full bg-[#0d131f] text-white text-[12px] font-medium py-1.5 px-4 lg:px-8 border-b border-[#1f293d]">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between">
        <!-- Left: Language, Currency, Social Icons -->
        <div class="flex items-center gap-3 text-white/90">
          <div class="flex items-center gap-1 cursor-pointer hover:text-white">
            <span>English</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </div>
          <span class="text-white/30">|</span>
          <div class="flex items-center gap-1 cursor-pointer hover:text-white">
            <span>BDT (৳)</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </div>
          <span class="text-white/30">|</span>
          <div class="flex items-center gap-2.5 text-white/80 pl-1">
            <a class="hover:text-white transition-colors" href="#" aria-label="Facebook">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </a>
            <a class="hover:text-white transition-colors" href="#" aria-label="Instagram">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            <a class="hover:text-white transition-colors" href="#" aria-label="YouTube">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
              </svg>
            </a>
          </div>
        </div>
        <!-- Center: Flash Shipping Offer -->
        <div class="font-semibold tracking-wide text-[12px] flex items-center gap-1.5 text-[#fed488]">
          <span class="text-[#ffb703]">⚡</span>
          <span>FREE SHIPPING FOR ALL ORDERS OF ৳5,000 / $150</span>
        </div>
        <!-- Right: Reviews, Contact Us, FAQs -->
        <div class="hidden md:flex items-center gap-3 text-white/90 text-[12px]">
          <router-link class="hover:text-white transition-colors" to="/reviews">Reviews</router-link>
          <span class="text-white/30">|</span>
          <router-link class="hover:text-white transition-colors" to="/contact">Contact Us</router-link>
          <span class="text-white/30">|</span>
          <router-link class="hover:text-white transition-colors" to="/faq">FAQs</router-link>
        </div>
      </div>
    </div>

    <!-- Main Navigation / Search Bar Header -->
    <div class="bg-white border-b border-border-hairline py-3 px-4 lg:px-8">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        <!-- Logo Area with Mobile Toggle -->
        <div class="flex items-center gap-3">
          <button 
            type="button"
            class="lg:hidden p-1.5 -ml-1 text-text-charcoal hover:text-primary transition-colors focus:outline-none flex items-center justify-center rounded-md cursor-pointer" 
            @click="toggleMobileNav" 
            aria-label="Open Navigation Menu"
          >
            <span class="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <!-- Logo (Emblem + Text) -->
          <router-link class="flex items-center gap-3 group shrink-0" to="/">
            <div class="w-10 h-10 rounded-full bg-[#0d131f] flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">
              A
            </div>
            <div class="flex flex-col">
              <span class="font-headline-md text-[24px] font-semibold text-[#111827] tracking-tight leading-none font-serif">
                ARTS OF SHOP
              </span>
              <span class="text-[9px] uppercase tracking-[0.25em] text-[#ba1a2e] font-semibold mt-1">
                Festive • Bridal • Elegance
              </span>
            </div>
          </router-link>
        </div>

        <!-- Center Search Bar with Red Highlighted Border -->
        <div class="flex-1 max-w-2xl mx-auto hidden lg:flex">
          <form @submit.prevent="handleSearch" class="w-full flex items-center rounded-lg border-2 border-[#ba1a2e] bg-white overflow-hidden shadow-sm h-11">
            <div class="flex items-center gap-1 px-3 text-[13px] text-text-charcoal bg-transparent shrink-0 cursor-pointer font-medium select-none">
              <span>Select Category</span>
              <span class="material-symbols-outlined text-[16px] text-text-muted">expand_more</span>
            </div>
            <div class="w-[1px] h-6 bg-border-hairline mx-1"></div>
            <input 
              v-model="searchQuery"
              class="flex-1 px-3 text-[13px] text-text-charcoal placeholder:text-text-muted focus:outline-none bg-transparent" 
              placeholder="Search for products..." 
              type="text"
            />
            <button 
              type="submit"
              class="bg-[#ba1a2e] hover:bg-[#92001d] text-white w-12 h-full flex items-center justify-center transition-colors shrink-0 cursor-pointer" 
              aria-label="Search"
            >
              <span class="material-symbols-outlined text-[20px]">search</span>
            </button>
          </form>
        </div>

        <!-- Right: Account, Wishlist, Cart -->
        <div class="flex items-center gap-5 shrink-0">
          <!-- Account -->
          <router-link class="flex items-center gap-2 text-text-charcoal hover:text-primary transition-colors cursor-pointer" to="/account">
            <div class="w-8 h-8 rounded-full border border-border-hairline flex items-center justify-center text-text-charcoal">
              <span class="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div class="hidden sm:flex flex-col text-left leading-none">
              <span class="text-[11px] text-text-muted">Sign In</span>
              <span class="text-[12px] font-bold text-text-charcoal mt-0.5">Account</span>
            </div>
          </router-link>

          <!-- Wishlist with Badge -->
          <router-link 
            class="flex items-center text-text-charcoal hover:text-primary transition-colors cursor-pointer group" 
            to="/cart"
            aria-label="Wishlist"
          >
            <div class="relative w-8 h-8 flex items-center justify-center text-[#111827] group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[26px]">favorite_border</span>
              <span class="absolute -top-1 -right-1 bg-[#ba1a2e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </div>
          </router-link>

          <!-- Cart with reactive total and badge (Opens Cart Slide-Over Drawer) -->
          <button 
            type="button"
            @click="openCartDrawer"
            class="flex items-center gap-2 text-text-charcoal hover:text-primary transition-colors cursor-pointer group focus:outline-none" 
            aria-label="Open Shopping Bag Drawer"
          >
            <div class="relative w-8 h-8 flex items-center justify-center text-[#111827] group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[26px]">shopping_bag</span>
              <span class="absolute -top-1 -right-1 bg-[#ba1a2e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {{ itemCount }}
              </span>
            </div>
            <div class="flex flex-col text-left leading-none">
              <span class="text-[10px] text-text-muted font-bold uppercase tracking-wider">Cart</span>
              <span class="text-[13px] font-bold text-text-charcoal mt-0.5 group-hover:text-primary transition-colors">{{ formattedSubtotal }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Sub-Navigation Category Links + Helpline -->
    <div class="bg-white border-b border-border-hairline px-4 lg:px-8">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between">
        <nav class="flex items-center gap-5 lg:gap-7 overflow-x-auto py-2.5 text-[12px] font-bold tracking-wider uppercase text-text-charcoal">
          <router-link 
            to="/" 
            class="pb-1 whitespace-nowrap transition-colors" 
            :class="route.path === '/' ? 'text-[#ba1a2e] border-b-2 border-[#ba1a2e]' : 'hover:text-[#ba1a2e]'"
          >
            Home
          </router-link>
          <router-link 
            to="/category" 
            class="pb-1 whitespace-nowrap transition-colors"
            :class="route.path === '/category' ? 'text-[#ba1a2e] border-b-2 border-[#ba1a2e]' : 'hover:text-[#ba1a2e]'"
          >
            Floral Saree
          </router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Floral Three Piece</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Hijab</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Jewellary</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Grown</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Lehenga</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Tote Bag</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Men's Panjabi</router-link>
          <router-link to="/category" class="hover:text-[#ba1a2e] pb-1 whitespace-nowrap transition-colors">Kids</router-link>
          <router-link 
            to="/contact" 
            class="pb-1 whitespace-nowrap transition-colors"
            :class="route.path === '/contact' ? 'text-[#ba1a2e] border-b-2 border-[#ba1a2e]' : 'hover:text-[#ba1a2e]'"
          >
            Contact
          </router-link>
        </nav>
        <div class="hidden xl:flex items-center gap-2 text-xs font-semibold text-text-charcoal pl-4 shrink-0">
          <span class="material-symbols-outlined text-[18px] text-[#25D366]">support_agent</span>
          <span class="text-text-muted">Order Helpline:</span>
          <a class="text-[#ba1a2e] hover:underline" href="tel:+8801302694680">+880 1302 694680</a>
        </div>
      </div>
    </div>
  </header>
</template>
