<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useUI } from '../composables/useUI'

const router = useRouter()
const { items, itemsSubtotal, itemCount, updateQuantity, removeItem } = useCart()
const { isCartDrawerOpen, closeCartDrawer } = useUI()

const freeShippingThreshold = 5000
const progressPercent = computed(() => {
  return Math.min(100, Math.round((itemsSubtotal.value / freeShippingThreshold) * 100))
})
const remainingForFreeShipping = computed(() => {
  return Math.max(0, freeShippingThreshold - itemsSubtotal.value)
})

function handleKeydown(e) {
  if (e.key === 'Escape' && isCartDrawerOpen.value) {
    closeCartDrawer()
  }
}

watch(isCartDrawerOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

function goToCart() {
  closeCartDrawer()
  router.push('/cart')
}

function goToCheckout() {
  closeCartDrawer()
  router.push('/checkout')
}

function goToShopping() {
  closeCartDrawer()
  router.push('/category')
}
</script>

<template>
  <div 
    v-if="isCartDrawerOpen" 
    class="relative z-50 select-none" 
    aria-labelledby="cart-drawer-title" 
    role="dialog" 
    aria-modal="true"
  >
    <!-- Dark Dimmed Backdrop -->
    <transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        @click="closeCartDrawer"
      ></div>
    </transition>

    <!-- Slide-over Drawer Panel from Right -->
    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
      <transition
        appear
        enter-active-class="transform transition ease-out duration-300 sm:duration-400"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in duration-300 sm:duration-400"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-border-hairline">
          <!-- Drawer Header -->
          <div class="px-5 py-4 bg-white border-b border-border-hairline flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 id="cart-drawer-title" class="font-serif font-bold text-lg text-text-charcoal tracking-tight">
                Shopping Bag
              </h2>
              <span class="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}
              </span>
            </div>
            <button 
              type="button" 
              class="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-charcoal hover:bg-slate-100 transition-colors cursor-pointer"
              @click="closeCartDrawer" 
              aria-label="Close Shopping Bag"
            >
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Free Shipping Progress Notice -->
          <div class="px-5 py-3 bg-[#fdf8f8] border-b border-border-subtle shrink-0">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span v-if="remainingForFreeShipping > 0" class="text-text-charcoal font-medium">
                Add <strong class="text-primary font-bold">৳ {{ remainingForFreeShipping.toLocaleString('en-US') }}</strong> more for <span class="text-emerald-700 font-bold">FREE SHIPPING</span>
              </span>
              <span v-else class="text-emerald-700 font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">celebration</span>
                Free Shipping Unlocked!
              </span>
              <span class="text-[10px] text-text-muted font-bold">{{ progressPercent }}%</span>
            </div>
            <!-- Progress Bar Line -->
            <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-500 rounded-full"
                :class="remainingForFreeShipping === 0 ? 'bg-emerald-600' : 'bg-primary'"
                :style="{ width: `${progressPercent}%` }"
              ></div>
            </div>
          </div>

          <!-- Drawer Body: Product List or Empty State -->
          <div class="flex-1 overflow-y-auto px-5 py-4 divide-y divide-border-hairline">
            <!-- EMPTY STATE -->
            <div v-if="items.length === 0" class="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-text-muted">
                <span class="material-symbols-outlined text-[44px]">shopping_bag</span>
              </div>
              <div>
                <h3 class="font-serif font-bold text-lg text-text-charcoal mb-1">Your bag is empty</h3>
                <p class="text-xs text-text-muted max-w-xs">
                  Explore our festive sarees, bridal lehengas, and designer panjabis to find your perfect heirloom outfit.
                </p>
              </div>
              <button 
                type="button" 
                @click="goToShopping"
                class="mt-2 bg-primary hover:bg-crimson-hover text-white py-2.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                Start Shopping
              </button>
            </div>

            <!-- CART ITEMS LIST -->
            <div v-else class="space-y-4 pt-1">
              <div 
                v-for="item in items" 
                :key="item.id" 
                class="flex gap-3.5 pt-3 first:pt-0"
              >
                <!-- Product Thumbnail -->
                <div class="relative w-20 h-24 sm:w-22 sm:h-28 rounded-lg overflow-hidden border border-border-hairline shrink-0 bg-slate-100 shadow-xs">
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-full h-full object-cover object-center" 
                  />
                </div>

                <!-- Product Information & Controls -->
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-2">
                      <h4 class="font-semibold text-xs sm:text-sm text-text-charcoal leading-snug line-clamp-2">
                        {{ item.name }}
                      </h4>
                      <!-- Remove Button -->
                      <button 
                        type="button"
                        @click="removeItem(item.id)" 
                        class="text-text-muted hover:text-red-600 transition-colors p-1 -mr-1 cursor-pointer" 
                        title="Remove Item"
                      >
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <!-- Selected Variation Specs -->
                    <div class="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-text-muted">
                      <span v-if="item.fabric">
                        <span class="font-medium text-text-charcoal">Fabric:</span> {{ item.fabric }}
                      </span>
                      <span v-if="item.color">
                        <span class="font-medium text-text-charcoal">Color:</span> {{ item.color }}
                      </span>
                      <span v-if="item.designColor">
                        <span class="font-medium text-text-charcoal">Design:</span> {{ item.designColor }}
                      </span>
                      <span v-if="item.size">
                        <span class="font-medium text-text-charcoal">Size:</span> {{ item.size }}
                      </span>
                    </div>
                  </div>

                  <!-- Quantity Stepper & Price Total -->
                  <div class="flex items-center justify-between pt-2 mt-1">
                    <!-- Quantity Stepper -->
                    <div class="inline-flex items-center border border-border-hairline rounded-md bg-white shadow-xs">
                      <button 
                        type="button"
                        @click="updateQuantity(item.id, item.quantity - 1)" 
                        class="w-7 h-7 flex items-center justify-center text-text-charcoal hover:bg-slate-100 transition cursor-pointer text-xs"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span class="w-8 text-center text-xs font-bold text-text-charcoal select-none">
                        {{ item.quantity }}
                      </span>
                      <button 
                        type="button"
                        @click="updateQuantity(item.id, item.quantity + 1)" 
                        class="w-7 h-7 flex items-center justify-center text-text-charcoal hover:bg-slate-100 transition cursor-pointer text-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <!-- Item Price Total -->
                    <div class="text-right">
                      <span class="font-serif font-bold text-sm text-primary">
                        ৳ {{ (item.price * item.quantity).toLocaleString('en-US') }}.00
                      </span>
                      <span v-if="item.quantity > 1" class="block text-[10px] text-text-muted">
                        ৳ {{ item.price.toLocaleString('en-US') }} each
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer (Subtotal & Actions) -->
          <div v-if="items.length > 0" class="p-5 bg-white border-t border-border-hairline shadow-lg space-y-3.5 shrink-0">
            <!-- Subtotal Row -->
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted font-medium">Subtotal</span>
              <span class="font-serif font-bold text-xl text-primary">
                ৳ {{ itemsSubtotal.toLocaleString('en-US') }}.00
              </span>
            </div>

            <p class="text-[11px] text-text-muted text-center">
              Shipping &amp; discounts will be calculated at checkout.
            </p>

            <!-- Buttons -->
            <div class="space-y-2">
              <button 
                type="button" 
                @click="goToCheckout"
                class="w-full py-3.5 px-4 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button 
                type="button" 
                @click="goToCart"
                class="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-text-charcoal border border-border-hairline rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Full Shopping Bag
              </button>
            </div>

            <!-- Nationwide COD Notice -->
            <div class="flex items-center justify-center gap-1.5 text-[11px] text-text-muted pt-1">
              <span class="material-symbols-outlined text-emerald-600 text-[15px]">verified</span>
              <span>Nationwide Cash on Delivery (COD) Available</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
