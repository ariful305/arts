<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const { addItem } = useCart()
const isWishlisted = ref(false)

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}

function goToProduct() {
  router.push('/single')
}

function handleOrderNow() {
  addItem(props.product, 1)
  router.push('/cart')
}

function buyViaWhatsApp() {
  const phone = '8801302694680'
  const title = props.product.name || props.product.title
  const price = props.product.priceFormatted || `৳ ${props.product.price.toLocaleString('en-US')}.00`
  const url = window.location.origin + '/single'
  const msg = encodeURIComponent(`Hello Arts of Shop, I want to order "${title}" (Price: ${price}). Link: ${url}`)
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
}
</script>

<template>
  <div class="product-card group relative flex flex-col justify-between bg-surface-card rounded-xl border border-border-hairline p-2.5 transition-all duration-300 hover:shadow-[0_12px_32px_-4px_rgba(26,26,26,0.12)] hover:-translate-y-1">
    <div class="relative aspect-[3/4] overflow-hidden rounded-lg mb-2 bg-[#f6f6f6]">
      <span v-if="product.discount" class="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
        {{ product.discount }}
      </span>
      <button 
        type="button"
        @click.stop="toggleWishlist"
        class="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/85 backdrop-blur hover:bg-white text-text-charcoal flex items-center justify-center transition-colors shadow-xs" 
        :title="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'" 
        :aria-label="`Add ${product.name} to wishlist`"
      >
        <span class="material-symbols-outlined text-[13px]" :class="{ 'text-primary': isWishlisted }">
          {{ isWishlisted ? 'favorite' : 'favorite' }}
        </span>
      </button>
      <router-link to="/single" class="block w-full h-full">
        <img 
          :alt="product.name || product.title" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          :src="product.image" 
          decoding="async" 
          loading="lazy"
        />
      </router-link>
    </div>
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <router-link to="/single">
          <h4 class="text-[11px] font-semibold text-text-charcoal line-clamp-2 leading-tight mb-1 hover:text-primary transition-colors">
            {{ product.name || product.title }}
          </h4>
        </router-link>
        <div class="flex items-center gap-1 text-champagne-gold text-[9px] mb-1">
          <span class="material-symbols-outlined text-[11px]">star</span>
          <span class="material-symbols-outlined text-[11px]">star</span>
          <span class="material-symbols-outlined text-[11px]">star</span>
          <span class="material-symbols-outlined text-[11px]">star</span>
          <span class="material-symbols-outlined text-[11px]">star</span>
          <span class="text-[9px] text-gray-400 font-medium">({{ product.rating?.toFixed(1) || '5.0' }})</span>
        </div>
      </div>
      <div>
        <div class="text-[11px] mb-2 leading-none flex items-baseline gap-1">
          <span v-if="product.originalPrice" class="line-through text-gray-400 text-[9px]">{{ product.originalPrice }}</span>
          <span class="font-bold text-primary text-xs">{{ product.priceFormatted || `৳ ${product.price.toLocaleString('en-US')}` }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <button 
            type="button"
            @click="handleOrderNow"
            class="w-full py-1 px-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-primary hover:bg-crimson-hover text-white transition-all shadow-xs flex items-center justify-center gap-0.5 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[11px]">shopping_bag</span> Order Now
          </button>
          <button 
            type="button"
            @click="buyViaWhatsApp"
            class="w-full py-1 px-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-whatsapp-green hover:brightness-105 text-white transition-all shadow-xs flex items-center justify-center gap-0.5 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[11px]">chat</span> WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
