<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useUI } from '../composables/useUI'

const { showToast, addItem } = useCart()
const { openCartDrawer } = useUI()

const isLoggedIn = ref(true)
const authMode = ref('login') // 'login' or 'register'
const activeTab = ref('overview') // 'overview', 'orders', 'wishlist', 'addresses', 'measurements', 'settings'
const orderFilter = ref('all') // 'all', 'transit', 'delivered'

// Address Modal
const isAddressModalOpen = ref(false)
const newAddressTitle = ref('')
const newAddressRecipient = ref('')
const newAddressPhone = ref('')
const newAddressText = ref('')

// Measurements Edit Modal
const isMeasureModalOpen = ref(false)

// Login / Register state
const loginPhone = ref('01711223344')
const loginPassword = ref('••••••••')
const regName = ref('')
const regPhone = ref('')
const regPassword = ref('')

// User Profile
const user = ref({
  name: 'Nusrat Jahan',
  phone: '+880 1711-223344',
  email: 'nusrat.jahan@gmail.com',
  memberSince: 'October 2025',
  tier: 'Royal Atelier Patron',
  points: 1450,
  totalSpent: '৳ 54,200',
  ordersCount: 14
})

// Bespoke Measurements
const measurements = ref({
  bust: '36.0"',
  underbust: '30.0"',
  blouseLength: '14.5"',
  shoulder: '14.0"',
  sleeveLength: '11.0"',
  armhole: '15.5"',
  frontNeck: '7.0"',
  backNeck: '8.5"',
  notes: 'Prefers sweetheart neckline, soft lining, padded blouse finish.'
})

// Orders List
const orders = ref([
  {
    id: 'AOS-89421',
    date: '28 Sep 2026',
    status: 'In Transit',
    statusStep: 3, // 1: Placed, 2: Tailoring, 3: In Transit, 4: Delivered
    statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
    total: 4070,
    deliveryAddress: 'Apartment 4B, House 18, Road 7, Sector 3, Uttara, Dhaka',
    estimatedDelivery: 'Tomorrow, by 5:00 PM',
    items: [
      {
        name: 'The Saffron Marigold Lehenga',
        fabric: 'Pure Silk & Zardozi',
        color: 'Saffron Gold',
        qty: 1,
        price: 4000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q'
      }
    ]
  },
  {
    id: 'AOS-55102',
    date: '15 Aug 2026',
    status: 'Delivered',
    statusStep: 4,
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    total: 2770,
    deliveryAddress: 'Level 5, Plot 12, Gulshan Avenue, Dhaka',
    estimatedDelivery: 'Delivered on 16 Aug 2026',
    items: [
      {
        name: 'Soft Peach White Floral Organza Saree',
        fabric: 'Organza Silk',
        color: 'Soft Peach',
        qty: 1,
        price: 2700,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdvDH6UhRwMB7WiY3EiqIkBPdzJLdviUsdcHXwg49Nk9AJb3GUZxoFBC2JnYdrflwEPQYGuYOQjbm81KlspJb3cPNTE5HebHIPCazyKc-nQqaxuIUR72Lai1iWUSwMgPE7_bLubGn_FLEODMncDBSBL3gFJAsA47HvqfG45uieWMGCHi7RwaH7EsmFCgb51mcJ1DqRPAgmEB_i66gxq1aYObbdriXReP0JcRv4r-T_ygV0weA-2gVb'
      }
    ]
  },
  {
    id: 'AOS-41890',
    date: '02 Jun 2026',
    status: 'Delivered',
    statusStep: 4,
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    total: 3570,
    deliveryAddress: 'Apartment 4B, House 18, Road 7, Sector 3, Uttara, Dhaka',
    estimatedDelivery: 'Delivered on 04 Jun 2026',
    items: [
      {
        name: 'Festive Embroidered Silk Panjabi',
        fabric: 'Cotton-Silk Blend',
        color: 'Pastel Ivory',
        qty: 1,
        price: 3500,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW8WgLY5KIswpHHYE3C6xibYM-GwMVJCRswrgY2ERfvOYFj45s5uLQOHsnGHAwQiy3Aw3w47YGN5T_FVHwppCNoKzfzTakWNM4yiP-p-vW44qp6jXKg-4HXNy3j27huFpMraIa7stT-UQAfs01N1kv0NnqYni6dJFiBmqLRFIoyV120sJquXSNWD7diUbmU7nASS3diWvIs60pDsfADtzmr82zuJOMuDea9ef_ZO3WgCVb1u-3DtbF'
      }
    ]
  }
])

// Saved Addresses
const addresses = ref([
  {
    id: 1,
    title: 'Primary Residence (Home)',
    recipient: 'Nusrat Jahan',
    phone: '+880 1711-223344',
    address: 'Apartment 4B, House 18, Road 7, Sector 3, Uttara, Dhaka - 1230',
    isDefault: true
  },
  {
    id: 2,
    title: 'Atelier Work Studio (Office)',
    recipient: 'Nusrat Jahan',
    phone: '+880 1711-223344',
    address: 'Level 5, Plot 12, Gulshan Avenue, Dhaka - 1212',
    isDefault: false
  }
])

// Wishlist
const wishlist = ref([
  {
    id: 101,
    title: 'Royal Botanical Lilac Saree',
    price: 3200,
    originalPrice: 4200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ATRmS427aRdL8HnAkd64oNUq-xJT-gY2NPSy5CXGrhAUFXHmGSJZfr_Mn6E9xXhCw7FzXocyfrbhNK4kKrct41v0sB_sNzPZrrcW6K7Vu3FnXHe-YXHE1nTv2dhdDsDTZMDRW48NI2g6aMADEmKGyYjANM8BOhyXofMh3M14Vto1zfUEJHW9ysA9Rlh3Pz74-_u-pcGX0qbsWGJMIocv3fVOyFy4oEVMZkoslElqwo_e2mXkrQcz',
    fabric: 'Pure Tissue Silk'
  },
  {
    id: 102,
    title: 'Festive Pastel Mint Panjabi',
    price: 3600,
    originalPrice: 4500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW8WgLY5KIswpHHYE3C6xibYM-GwMVJCRswrgY2ERfvOYFj45s5uLQOHsnGHAwQiy3Aw3w47YGN5T_FVHwppCNoKzfzTakWNM4yiP-p-vW44qp6jXKg-4HXNy3j27huFpMraIa7stT-UQAfs01N1kv0NnqYni6dJFiBmqLRFIoyV120sJquXSNWD7diUbmU7nASS3diWvIs60pDsfADtzmr82zuJOMuDea9ef_ZO3WgCVb1u-3DtbF',
    fabric: 'Cotton-Silk Blend'
  }
])

function handleLogin() {
  isLoggedIn.value = true
  showToast(`Welcome back, ${user.value.name}!`)
}

function handleRegister() {
  user.value.name = regName.value || 'Valued Patron'
  user.value.phone = regPhone.value || '+880 1XXXXXXXXX'
  isLoggedIn.value = true
  showToast(`Account created! Welcome to Arts of Shop Atelier.`)
}

function handleLogout() {
  isLoggedIn.value = false
  showToast('You have been signed out safely.')
}

function moveToCart(product) {
  addItem(
    {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    },
    1,
    { fabric: product.fabric }
  )
  wishlist.value = wishlist.value.filter(item => item.id !== product.id)
  openCartDrawer()
}

function removeWishlist(id) {
  wishlist.value = wishlist.value.filter(item => item.id !== id)
  showToast('Item removed from wishlist.')
}

function addAddress() {
  if (!newAddressTitle.value || !newAddressRecipient.value || !newAddressText.value) {
    alert('Please fill in title, recipient, and full address.')
    return
  }
  addresses.value.push({
    id: Date.now(),
    title: newAddressTitle.value,
    recipient: newAddressRecipient.value,
    phone: newAddressPhone.value || user.value.phone,
    address: newAddressText.value,
    isDefault: false
  })
  newAddressTitle.value = ''
  newAddressRecipient.value = ''
  newAddressPhone.value = ''
  newAddressText.value = ''
  isAddressModalOpen.value = false
  showToast('New delivery address saved!')
}

function setDefaultAddress(id) {
  addresses.value.forEach(a => a.isDefault = (a.id === id))
  showToast('Default address updated.')
}

function saveMeasurements() {
  isMeasureModalOpen.value = false
  showToast('Bespoke measurements updated successfully!')
}
</script>

<template>
  <main class="w-full flex-1 pb-16">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="py-4">
        <ol class="flex items-center space-x-2 text-xs text-text-muted">
          <li>
            <router-link class="hover:text-primary transition-colors" to="/">Home</router-link>
          </li>
          <li><span class="text-champagne-gold">/</span></li>
          <li class="text-text-muted">Patron Portal</li>
          <li><span class="text-champagne-gold">/</span></li>
          <li aria-current="page" class="text-text-charcoal font-semibold">Customer Dashboard</li>
        </ol>
      </nav>

      <!-- GUEST / AUTH STATE -->
      <div v-if="!isLoggedIn" class="max-w-md mx-auto my-8 bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 shadow-md">
        <!-- Auth Mode Toggle -->
        <div class="flex border-b border-border-hairline mb-6">
          <button 
            type="button" 
            @click="authMode = 'login'" 
            class="flex-1 pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
            :class="authMode === 'login' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-charcoal'"
          >
            Sign In
          </button>
          <button 
            type="button" 
            @click="authMode = 'register'" 
            class="flex-1 pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
            :class="authMode === 'register' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text-charcoal'"
          >
            Create Account
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Phone Number or Email</label>
            <input 
              v-model="loginPhone"
              required 
              type="text" 
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="font-bold text-text-charcoal uppercase tracking-wider">Password</label>
              <a href="#" class="text-[11px] text-primary hover:underline">Forgot?</a>
            </div>
            <input 
              v-model="loginPassword"
              required 
              type="password" 
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>
          <button 
            type="submit" 
            class="w-full py-3.5 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            Sign In to Atelier Account
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Full Name *</label>
            <input 
              v-model="regName"
              required 
              type="text" 
              placeholder="e.g. Tanvir Ahmed"
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Mobile Number (WhatsApp) *</label>
            <input 
              v-model="regPhone"
              required 
              type="tel" 
              placeholder="01XXXXXXXXX"
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Set Password *</label>
            <input 
              v-model="regPassword"
              required 
              type="password" 
              placeholder="Minimum 6 characters"
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>
          <button 
            type="submit" 
            class="w-full py-3.5 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            Join Royal Atelier
          </button>
        </form>
      </div>

      <!-- MODERN LUXURY CUSTOMER DASHBOARD LAYOUT -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- LEFT SIDEBAR: PATRON NAVIGATION & VIP BADGE -->
        <aside class="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-28">
          <!-- Patron Profile Monograph Card -->
          <div class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs text-center space-y-4 relative overflow-hidden">
            <div class="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-primary/5 pointer-events-none"></div>

            <!-- Avatar -->
            <div class="relative w-20 h-20 mx-auto">
              <div class="w-full h-full rounded-full bg-gradient-to-tr from-[#0d131f] to-[#2d3a4f] text-amber-300 font-serif font-bold text-3xl flex items-center justify-center shadow-md border-2 border-amber-400/40">
                {{ user.name.charAt(0) }}
              </div>
              <span class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Patron">
                <span class="material-symbols-outlined text-[14px]">check</span>
              </span>
            </div>

            <!-- Name & Tier -->
            <div>
              <h2 class="font-serif font-bold text-lg text-text-charcoal leading-snug">{{ user.name }}</h2>
              <span class="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold tracking-widest uppercase border border-amber-200">
                <span class="material-symbols-outlined text-[13px] text-amber-600">stars</span>
                {{ user.tier }}
              </span>
              <p class="text-[11px] text-text-muted mt-2">{{ user.phone }}</p>
            </div>

            <!-- Points Counter Pill -->
            <div class="p-3 bg-slate-50 rounded-xl border border-border-hairline flex items-center justify-between text-xs">
              <span class="text-text-muted font-medium">Reward Points:</span>
              <span class="font-serif font-bold text-primary text-sm">{{ user.points.toLocaleString() }} pts</span>
            </div>
          </div>

          <!-- Modern Navigation Menu -->
          <nav class="bg-surface-card rounded-2xl border border-border-hairline p-2 shadow-xs space-y-1">
            <button 
              type="button"
              @click="activeTab = 'overview'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              :class="activeTab === 'overview' ? 'bg-primary text-white shadow-xs' : 'text-text-charcoal hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Overview</span>
              </div>
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>

            <button 
              type="button"
              @click="activeTab = 'orders'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              :class="activeTab === 'orders' ? 'bg-primary text-white shadow-xs' : 'text-text-charcoal hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">local_mall</span>
                <span>My Orders</span>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold" :class="activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-text-muted'">
                {{ orders.length }}
              </span>
            </button>

            <button 
              type="button"
              @click="activeTab = 'wishlist'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              :class="activeTab === 'wishlist' ? 'bg-primary text-white shadow-xs' : 'text-text-charcoal hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
                <span>Wishlist &amp; Saved</span>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold" :class="activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-slate-100 text-text-muted'">
                {{ wishlist.length }}
              </span>
            </button>

            <button 
              type="button"
              @click="activeTab = 'addresses'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              :class="activeTab === 'addresses' ? 'bg-primary text-white shadow-xs' : 'text-text-charcoal hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">location_on</span>
                <span>Saved Addresses</span>
              </div>
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>

            <button 
              type="button"
              @click="activeTab = 'measurements'"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              :class="activeTab === 'measurements' ? 'bg-primary text-white shadow-xs' : 'text-text-charcoal hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">straighten</span>
                <span>Bespoke Measurements</span>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Active
              </span>
            </button>

            <div class="pt-2 border-t border-border-subtle mt-2">
              <button 
                type="button"
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 transition cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </nav>

          <!-- Banani Stylist Direct Chat Widget -->
          <div class="bg-[#1b3429] text-white rounded-2xl p-5 shadow-xs space-y-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
              ATELIER STYLIST
            </span>
            <p class="text-xs text-gray-200 font-light leading-relaxed">
              Need custom tailoring advice or tracking an urgent festive order?
            </p>
            <a 
              href="https://wa.me/8801302694680?text=Hello%20Arts%20of%20Shop%20I%20need%20assistance" 
              target="_blank"
              class="w-full py-2.5 bg-whatsapp-green hover:brightness-105 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xs"
            >
              <span class="material-symbols-outlined text-[17px]">chat</span>
              <span>WhatsApp Stylist</span>
            </a>
          </div>
        </aside>

        <!-- RIGHT CONTENT AREA -->
        <section class="lg:col-span-8 xl:col-span-9 space-y-6">
          <!-- 1. DASHBOARD OVERVIEW TAB -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Welcome Monograph Banner -->
            <div class="bg-gradient-to-r from-[#0d131f] via-[#16202c] to-[#0d131f] text-white rounded-2xl p-6 sm:p-8 border border-[#2d3a4f] shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="relative z-10 space-y-2">
                <span class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#fed488] block">
                  PATRON EXCELLENCE PORTAL
                </span>
                <h3 class="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Welcome back, {{ user.name }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-300 font-light max-w-lg">
                  You have <span class="text-amber-300 font-bold">1 order in transit</span> and <span class="text-amber-300 font-bold">৳ 1,450</span> worth of redeemable reward points for your next heirloom purchase.
                </p>
              </div>
              <router-link 
                to="/category"
                class="shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Heirlooms</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </router-link>
            </div>

            <!-- 4 Modern Stat Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-surface-card rounded-2xl border border-border-hairline p-5 shadow-xs space-y-2">
                <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Total Orders</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-serif text-2xl font-bold text-text-charcoal">{{ user.ordersCount }}</span>
                  <span class="text-[11px] text-emerald-600 font-bold">Verified</span>
                </div>
              </div>

              <div class="bg-surface-card rounded-2xl border border-border-hairline p-5 shadow-xs space-y-2">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">local_shipping</span>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-text-muted block">In Transit</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-serif text-2xl font-bold text-text-charcoal">1 Order</span>
                  <span class="text-[11px] text-amber-600 font-bold">Express</span>
                </div>
              </div>

              <div class="bg-surface-card rounded-2xl border border-border-hairline p-5 shadow-xs space-y-2">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">loyalty</span>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Reward Points</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-serif text-2xl font-bold text-text-charcoal">{{ user.points.toLocaleString() }}</span>
                  <span class="text-[11px] text-emerald-600 font-bold">৳1,450 val</span>
                </div>
              </div>

              <div class="bg-surface-card rounded-2xl border border-border-hairline p-5 shadow-xs space-y-2">
                <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">favorite</span>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Saved Wishlist</span>
                <div class="flex items-baseline gap-2">
                  <span class="font-serif text-2xl font-bold text-text-charcoal">{{ wishlist.length }} Items</span>
                </div>
              </div>
            </div>

            <!-- LIVE ORDER TRACKER CARD -->
            <div class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border-hairline">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-serif font-bold text-base text-text-charcoal">Live Order Status: #AOS-89421</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      In Transit
                    </span>
                  </div>
                  <p class="text-xs text-text-muted mt-0.5">Estimated Delivery: <strong>Tomorrow, by 5:00 PM</strong></p>
                </div>
                <a 
                  href="https://wa.me/8801302694680?text=Hello%20Arts%20of%20Shop%20tracking%20order%20AOS-89421" 
                  target="_blank"
                  class="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-[16px]">chat</span>
                  <span>Track Courier Live</span>
                </a>
              </div>

              <!-- 4-Step Visual Stepper -->
              <div class="py-2">
                <div class="grid grid-cols-4 gap-2 text-center text-xs">
                  <!-- Step 1: Confirmed -->
                  <div class="space-y-2">
                    <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                      ✓
                    </div>
                    <span class="font-bold text-text-charcoal block">Confirmed</span>
                    <span class="text-[10px] text-text-muted block">28 Sep, 10:30 AM</span>
                  </div>

                  <!-- Step 2: Tailoring -->
                  <div class="space-y-2">
                    <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                      ✓
                    </div>
                    <span class="font-bold text-text-charcoal block">Tailoring Done</span>
                    <span class="text-[10px] text-text-muted block">28 Sep, 4:00 PM</span>
                  </div>

                  <!-- Step 3: In Transit -->
                  <div class="space-y-2">
                    <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto text-xs font-bold ring-4 ring-amber-100 shadow-xs">
                      <span class="material-symbols-outlined text-[16px]">local_shipping</span>
                    </div>
                    <span class="font-bold text-amber-700 block">Out for Delivery</span>
                    <span class="text-[10px] text-text-muted block">With Rider</span>
                  </div>

                  <!-- Step 4: Delivered -->
                  <div class="space-y-2 opacity-40">
                    <div class="w-8 h-8 rounded-full bg-slate-200 text-text-muted flex items-center justify-center mx-auto text-xs font-bold">
                      4
                    </div>
                    <span class="font-bold text-text-charcoal block">Delivered</span>
                    <span class="text-[10px] text-text-muted block">Tomorrow</span>
                  </div>
                </div>
              </div>

              <!-- Item Preview in Active Order -->
              <div class="bg-slate-50 p-4 rounded-xl border border-border-hairline flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 text-xs">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q" alt="The Saffron Marigold Lehenga" class="w-12 h-14 object-cover rounded-lg border border-border-hairline" />
                  <div>
                    <h4 class="font-bold text-text-charcoal">The Saffron Marigold Lehenga</h4>
                    <span class="text-text-muted text-[11px]">Pure Silk &amp; Zardozi • Saffron Gold • Qty: 1</span>
                  </div>
                </div>
                <span class="font-bold text-sm text-primary">৳ 4,070.00</span>
              </div>
            </div>

            <!-- VIP Member Offer Banner -->
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between gap-4 text-xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-lg">
                  ★
                </div>
                <div>
                  <span class="font-bold text-amber-900 uppercase tracking-wider block">Exclusive Patron Privilege</span>
                  <p class="text-amber-800">Use promo code <strong class="text-primary font-bold">ROYAL15</strong> to receive 15% off any bridal saree or custom panjabi.</p>
                </div>
              </div>
              <router-link to="/category" class="px-4 py-2 bg-primary hover:bg-crimson-hover text-white rounded-lg font-bold text-xs uppercase tracking-wider transition shrink-0">
                Redeem
              </router-link>
            </div>
          </div>

          <!-- 2. MY ORDERS TAB -->
          <div v-else-if="activeTab === 'orders'" class="space-y-5">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border-hairline">
              <div>
                <h3 class="font-serif font-bold text-xl text-text-charcoal">Order History ({{ orders.length }})</h3>
                <p class="text-xs text-text-muted">Review details, invoices, and re-order previous festive purchases.</p>
              </div>

              <!-- Filter Buttons -->
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  @click="orderFilter = 'all'"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  :class="orderFilter === 'all' ? 'bg-[#ba1a2e] text-white' : 'bg-slate-100 text-text-charcoal hover:bg-slate-200'"
                >
                  All ({{ orders.length }})
                </button>
                <button 
                  type="button" 
                  @click="orderFilter = 'transit'"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  :class="orderFilter === 'transit' ? 'bg-[#ba1a2e] text-white' : 'bg-slate-100 text-text-charcoal hover:bg-slate-200'"
                >
                  In Transit (1)
                </button>
                <button 
                  type="button" 
                  @click="orderFilter = 'delivered'"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  :class="orderFilter === 'delivered' ? 'bg-[#ba1a2e] text-white' : 'bg-slate-100 text-text-charcoal hover:bg-slate-200'"
                >
                  Delivered (2)
                </button>
              </div>
            </div>

            <!-- Orders Cards List -->
            <div class="space-y-4">
              <div 
                v-for="order in orders" 
                :key="order.id"
                class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs space-y-4"
              >
                <!-- Order Header -->
                <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border-hairline text-xs">
                  <div class="flex items-center gap-3">
                    <span class="font-bold text-sm text-text-charcoal font-serif">Order #{{ order.id }}</span>
                    <span class="text-text-muted">• Placed on {{ order.date }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span 
                      class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                      :class="order.statusColor"
                    >
                      {{ order.status }}
                    </span>
                    <span class="font-bold text-sm text-primary">
                      ৳ {{ order.total.toLocaleString('en-US') }}.00
                    </span>
                  </div>
                </div>

                <!-- Items in this order -->
                <div class="divide-y divide-border-subtle">
                  <div 
                    v-for="item in order.items" 
                    :key="item.name"
                    class="py-3 flex items-center justify-between gap-4 text-xs"
                  >
                    <div class="flex items-center gap-3.5">
                      <img :src="item.image" :alt="item.name" class="w-16 h-20 object-cover rounded-lg border border-border-hairline shrink-0" />
                      <div>
                        <h4 class="font-bold text-sm text-text-charcoal leading-snug">{{ item.name }}</h4>
                        <div class="text-[11px] text-text-muted mt-1 space-x-2">
                          <span>Fabric: {{ item.fabric }}</span>
                          <span>•</span>
                          <span>Color: {{ item.color }}</span>
                          <span>•</span>
                          <span>Qty: {{ item.qty }}</span>
                        </div>
                        <p class="text-[11px] text-text-muted mt-1">Delivery to: {{ order.deliveryAddress }}</p>
                      </div>
                    </div>
                    <div class="text-right shrink-0 space-y-2">
                      <span class="font-bold text-text-charcoal block">৳ {{ item.price.toLocaleString('en-US') }}.00</span>
                      <button 
                        type="button" 
                        @click="moveToCart(item)"
                        class="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-text-charcoal font-bold text-[11px] transition cursor-pointer"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. WISHLIST TAB -->
          <div v-else-if="activeTab === 'wishlist'" class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
              <div>
                <h3 class="font-serif font-bold text-xl text-text-charcoal">Saved Wishlist &amp; Heirlooms</h3>
                <p class="text-xs text-text-muted">Items saved for upcoming weddings and festive seasons.</p>
              </div>
              <span class="text-xs text-text-muted font-bold">{{ wishlist.length }} Saved</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div 
                v-for="product in wishlist" 
                :key="product.id"
                class="bg-surface-card rounded-2xl border border-border-hairline overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div class="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    @click="removeWishlist(product.id)"
                    class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-sm cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <span class="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                </div>
                <div class="p-4 space-y-3">
                  <div>
                    <span class="text-[11px] text-text-muted font-medium">{{ product.fabric }}</span>
                    <h4 class="font-bold text-sm text-text-charcoal leading-snug line-clamp-1 mt-0.5">{{ product.title }}</h4>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <span class="font-bold text-primary text-sm sm:text-base">৳ {{ product.price.toLocaleString('en-US') }}</span>
                    <span class="line-through text-xs text-text-muted">৳ {{ product.originalPrice.toLocaleString('en-US') }}</span>
                  </div>
                  <button 
                    type="button" 
                    @click="moveToCart(product)"
                    class="w-full py-2.5 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. SAVED ADDRESSES TAB -->
          <div v-else-if="activeTab === 'addresses'" class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
              <div>
                <h3 class="font-serif font-bold text-xl text-text-charcoal">Delivery Addresses</h3>
                <p class="text-xs text-text-muted">Manage shipping locations for express 24-hour deliveries.</p>
              </div>
              <button 
                type="button" 
                @click="isAddressModalOpen = true"
                class="px-4 py-2 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span class="material-symbols-outlined text-[16px]">add</span>
                <span>Add Address</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div 
                v-for="addr in addresses" 
                :key="addr.id"
                class="bg-surface-card rounded-2xl border border-border-hairline p-5 shadow-xs space-y-3 relative"
              >
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-sm text-text-charcoal">{{ addr.title }}</h4>
                  <span v-if="addr.isDefault" class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                    Default Delivery
                  </span>
                </div>
                <div class="text-xs text-text-muted space-y-1">
                  <p class="font-semibold text-text-charcoal">{{ addr.recipient }}</p>
                  <p>{{ addr.phone }}</p>
                  <p class="leading-relaxed text-gray-700">{{ addr.address }}</p>
                </div>
                <div class="pt-2 flex gap-3 text-xs font-bold text-primary border-t border-border-subtle">
                  <button 
                    v-if="!addr.isDefault" 
                    type="button" 
                    @click="setDefaultAddress(addr.id)"
                    class="hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. BESPOKE MEASUREMENTS TAB -->
          <div v-else-if="activeTab === 'measurements'" class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
              <div>
                <h3 class="font-serif font-bold text-xl text-text-charcoal">Bespoke Atelier Sizing Profile</h3>
                <p class="text-xs text-text-muted">Stored blouse, sleeve, and neck depths used for automatic checkout tailoring.</p>
              </div>
              <button 
                type="button" 
                @click="isMeasureModalOpen = true"
                class="px-4 py-2 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Measurements</span>
              </button>
            </div>

            <!-- Measurement Specs Grid -->
            <div class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs space-y-6">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Bust / Chest:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.bust }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Blouse Waist:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.underbust }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Blouse Length:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.blouseLength }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Shoulder Width:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.shoulder }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Sleeve Length:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.sleeveLength }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Armhole Round:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.armhole }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Front Neck Depth:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.frontNeck }}</span>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-border-hairline">
                  <span class="text-text-muted block mb-1">Back Neck Depth:</span>
                  <span class="font-serif text-lg font-bold text-text-charcoal">{{ measurements.backNeck }}</span>
                </div>
              </div>

              <!-- Tailoring Notes -->
              <div class="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs space-y-1">
                <span class="font-bold uppercase tracking-wider text-amber-900 block">Tailor Preference Note:</span>
                <p class="text-amber-800 font-medium">{{ measurements.notes }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- ADD ADDRESS MODAL -->
    <div 
      v-if="isAddressModalOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      @click="isAddressModalOpen = false"
    >
      <div 
        class="bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4"
        @click.stop
      >
        <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
          <h3 class="font-serif font-bold text-lg text-text-charcoal">Add New Delivery Address</h3>
          <button type="button" @click="isAddressModalOpen = false" class="text-text-muted hover:text-text-charcoal p-1 cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form @submit.prevent="addAddress" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Address Label *</label>
            <input 
              v-model="newAddressTitle" 
              required 
              type="text" 
              placeholder="e.g. Vacation Villa / Banani Studio" 
              class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Recipient Name *</label>
            <input 
              v-model="newAddressRecipient" 
              required 
              type="text" 
              placeholder="Full Name" 
              class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Phone Number</label>
            <input 
              v-model="newAddressPhone" 
              type="tel" 
              placeholder="01XXXXXXXXX" 
              class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Full Detailed Street Address *</label>
            <textarea 
              v-model="newAddressText" 
              required 
              rows="3" 
              placeholder="House, Road, Block, Sector, District..." 
              class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none"
            ></textarea>
          </div>
          <div class="pt-2 flex justify-end gap-3">
            <button type="button" @click="isAddressModalOpen = false" class="px-4 py-2 border border-border-hairline rounded-lg text-text-charcoal font-semibold cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 bg-primary hover:bg-crimson-hover text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- EDIT MEASUREMENTS MODAL -->
    <div 
      v-if="isMeasureModalOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      @click="isMeasureModalOpen = false"
    >
      <div 
        class="bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
        @click.stop
      >
        <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div>
            <h3 class="font-serif font-bold text-lg text-text-charcoal">Update Bespoke Measurements</h3>
            <p class="text-xs text-text-muted">Measurements are used by our Banani master tailors</p>
          </div>
          <button type="button" @click="isMeasureModalOpen = false" class="text-text-muted hover:text-text-charcoal p-1 cursor-pointer">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form @submit.prevent="saveMeasurements" class="space-y-3.5 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Bust / Chest</label>
              <input v-model="measurements.bust" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Blouse Waist</label>
              <input v-model="measurements.underbust" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Blouse Length</label>
              <input v-model="measurements.blouseLength" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Shoulder Width</label>
              <input v-model="measurements.shoulder" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Sleeve Length</label>
              <input v-model="measurements.sleeveLength" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Armhole Round</label>
              <input v-model="measurements.armhole" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Front Neck Depth</label>
              <input v-model="measurements.frontNeck" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Back Neck Depth</label>
              <input v-model="measurements.backNeck" type="text" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Special Tailoring Notes</label>
            <textarea v-model="measurements.notes" rows="2" class="w-full p-2.5 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none"></textarea>
          </div>
          <div class="pt-2 flex justify-end gap-3">
            <button type="button" @click="isMeasureModalOpen = false" class="px-4 py-2 border border-border-hairline rounded-lg text-text-charcoal font-semibold cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 bg-primary hover:bg-crimson-hover text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer">
              Save Measurements
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
