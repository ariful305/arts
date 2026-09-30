<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const sareeProducts = computed(() => {
  return products.filter(p => p.category === 'saree')
})

const panjabiProducts = computed(() => {
  return products.filter(p => p.category === 'panjabi')
})

// Hero Slider Data & Reactive Controls
const currentSlide = ref(0)
let timer = null
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)

const slides = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW8WgLY5KIswpHHYE3C6xibYM-GwMVJCRswrgY2ERfvOYFj45s5uLQOHsnGHAwQiy3Aw3w47YGN5T_FVHwppCNoKzfzTakWNM4yiP-p-vW44qp6jXKg-4HXNy3j27huFpMraIa7stT-UQAfs01N1kv0NnqYni6dJFiBmqLRFIoyV120sJquXSNWD7diUbmU7nASS3diWvIs60pDsfADtzmr82zuJOMuDea9ef_ZO3WgCVb1u-3DtbF',
    alt: 'Festive Panjabi Collection - Men seated in pastel designer outfits',
    tag: 'PANJABI',
    discount: 'FLAT 20%-50% OFF',
    subtitle: 'FESTIVE WEAR',
    link: '#panjabi-section',
    buttonText: 'Explore Panjabis'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdvDH6UhRwMB7WiY3EiqIkBPdzJLdviUsdcHXwg49Nk9AJb3GUZxoFBC2JnYdrflwEPQYGuYOQjbm81KlspJb3cPNTE5HebHIPCazyKc-nQqaxuIUR72Lai1iWUSwMgPE7_bLubGn_FLEODMncDBSBL3gFJAsA47HvqfG45uieWMGCHi7RwaH7EsmFCgb51mcJ1DqRPAgmEB_i66gxq1aYObbdriXReP0JcRv4r-T_ygV0weA-2gVb',
    alt: 'Model wearing Elegant Hand Printed Saree',
    tag: 'SAREE',
    discount: 'UP TO 35% OFF',
    subtitle: 'HAND-PRINTED HEIRLOOMS',
    link: '#product-showcase',
    buttonText: 'Shop Sarees'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFC-rg2_CC_EUxoLTx4GOzyNqCbpBRrLaYhZ7mAi9UBqhEvkV6GWrs9WuJ4Kpj1NVzHi_o-38OkB6KaLpacdCWP4QwjJJiawZxRb81E5xKWeg0sLlJiQS8Oja80o3WiVAvVcQEtDuZdm_T9ipBIwiaIJJGLgRzFPkEuiVvsy2ZSGF_Um2LzEt7FDBZBphQdselJtfsHY7BGyFOPPYWII0WPBbtkKEh2cfgaG0LpphXQNnshHrVMZZw',
    alt: 'Festive Bridal Lehenga Edit',
    tag: 'LEHENGA',
    discount: 'ROYAL COUTURE',
    subtitle: 'EXCLUSIVE BRIDAL EDIT',
    link: '/category',
    buttonText: 'View Lehengas'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  restartAutoplay()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
  restartAutoplay()
}

function goToSlide(idx) {
  currentSlide.value = idx
  restartAutoplay()
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartAutoplay() {
  stopAutoplay()
  startAutoplay()
}

function onTouchStart(e) {
  stopAutoplay()
  touchStartX.value = e.touches ? e.touches[0].clientX : e.clientX
  touchEndX.value = touchStartX.value
  isDragging.value = true
}

function onTouchMove(e) {
  if (!isDragging.value) return
  touchEndX.value = e.touches ? e.touches[0].clientX : e.clientX
}

function onTouchEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  } else {
    startAutoplay()
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <main class="flex-1 w-full">
    <!-- BEGIN: HeroSection with True Sliding Carousel -->
    <section 
      class="relative bg-slate-900 overflow-hidden select-none group" 
      data-purpose="hero-carousel"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Main Festive Banner Image Container with Track Slider -->
      <div 
        class="relative w-full h-[280px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden cursor-grab active:cursor-grabbing"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @mousedown="onTouchStart"
        @mousemove="onTouchMove"
        @mouseup="onTouchEnd"
        @mouseleave="onTouchEnd"
      >
        <!-- Horizontal Carousel Track -->
        <div 
          class="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="(slide, index) in slides" 
            :key="slide.tag" 
            class="w-full min-w-full flex-shrink-0 h-full relative"
          >
            <img 
              :alt="slide.alt" 
              class="w-full h-full object-cover object-center brightness-95 pointer-events-none select-none" 
              :src="slide.image" 
              decoding="async"
              :loading="index === 0 ? 'eager' : 'lazy'" 
            />
            <!-- Subtle gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none"></div>
          </div>
        </div>

        <!-- Carousel navigation arrows -->
        <button 
          type="button"
          @click.stop="prevSlide"
          aria-label="Previous Slide"
          class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-xl z-30 hover:scale-105 active:scale-95"
        >
          <span class="material-symbols-outlined text-sm sm:text-base pointer-events-none">chevron_left</span>
        </button>
        <button 
          type="button"
          @click.stop="nextSlide"
          aria-label="Next Slide"
          class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-200 border border-white/20 cursor-pointer shadow-xl z-30 hover:scale-105 active:scale-95"
        >
          <span class="material-symbols-outlined text-sm sm:text-base pointer-events-none">chevron_right</span>
        </button>

        <!-- Slide Indicators / Dots -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          <button 
            v-for="(slide, idx) in slides"
            :key="idx"
            type="button"
            @click.stop="goToSlide(idx)"
            class="h-2 rounded-full transition-all duration-300 cursor-pointer"
            :class="currentSlide === idx ? 'w-8 bg-amber-300 shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'"
            :aria-label="`Go to slide ${idx + 1}`"
          ></button>
        </div>
      </div>

      <!-- Festive Offer Strip directly under Hero (Dynamic to Active Slide) -->
      <div class="w-full bg-[#1b3429] text-white py-3 sm:py-4 px-4 sm:px-8 border-t border-emerald-800 transition-colors duration-500" data-purpose="festive-promo-bar">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div class="flex items-center space-x-3">
            <span class="font-serif italic text-2xl sm:text-4xl tracking-wider text-amber-200 transition-all duration-300">
              {{ slides[currentSlide].tag }}
            </span>
            <div class="h-8 w-px bg-emerald-700 hidden sm:block"></div>
            <div>
              <p class="text-sm sm:text-lg font-bold tracking-widest uppercase text-white transition-all duration-300">
                {{ slides[currentSlide].discount }}
              </p>
              <p class="text-[11px] sm:text-xs text-emerald-300 font-medium tracking-widest uppercase transition-all duration-300">
                {{ slides[currentSlide].subtitle }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="border border-white/30 px-4 py-1.5 rounded-sm bg-black/25">
              <span class="text-xs sm:text-sm font-semibold tracking-widest">ART'S OF SHOP</span>
            </div>
            <a 
              class="bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition shadow-sm" 
              :href="slides[currentSlide].link"
            >
              {{ slides[currentSlide].buttonText }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- END: HeroSection -->

    <!-- BEGIN: WomenCategories -->
    <section class="py-12 bg-white" data-purpose="category-grid" id="women-categories">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="mb-8">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-wide text-gray-900">
            WOMEN CATEGORIES
          </h2>
        </div>
        <!-- 6 Women Categories Grid matching original layout -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          <!-- Category 1: FLORAL THREE PIECE -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Floral Three Piece" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC49TbSi8ESnVWoMKTcle8kxjMhk4l9Nzgy7ZEc2zq24tIMsFkLRtkh50tYFMZjy0qt3uJtDzUOsfu77yRhsweMk13RWnQQlsXljSFavvqQ5ES8D3iRTSrn_AccdgK6HB_3_IhrZ6KsZgTZdGQOneR43YEwowNU-QzybAgY93ImPRCYOpEHP6j-ptBqgZmX9KxxakEPqyumIVHxtMaB0QvF6Nb5dPjDIyNgncY2lneZmt9D8wnpgZ5N" decoding="async" fetchpriority="high">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">FLORAL THREE PIECE</h3>
            <p class="text-[11px] text-gray-500 font-medium">13 products</p>
          </router-link>
          <!-- Category 2: GROWN -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Grown / Long Dresses" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Lk8Tc1VNrMu9tmQ6pTNFwd8O3K6oW3_Pd28HGTGIIBcHmLBhKM0lA71P6D-6o54PvQX0NqWYPH20edZOn0HvnsVlJSCiNVLpnlY-n8Hr74WsECQ8LhmTYAyjkhCfkSsii7EHU1BodofwsVg2kqDKP8Alnd7kL4zAc97j2YL4myxW0hMrEM3VpAIjMFeXaQdVnBHrPT_OLioThKNreIvGPkOkfZoyL5XClgVsLa2jZr6P3cJ_1mpv" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">GROWN</h3>
            <p class="text-[11px] text-gray-500 font-medium">5 products</p>
          </router-link>
          <!-- Category 3: ELEGANT HAND PRINTED SAREE -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Elegant Hand Printed Saree" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ATRmS427aRdL8HnAkd64oNUq-xJT-gY2NPSy5CXGrhAUFXHmGSJZfr_Mn6E9xXhCw7FzXocyfrbhNK4kKrct41v0sB_sNzPZrrcW6K7Vu3FnXHe-YXHE1nTv2dhdDsDTZMDRW48NI2g6aMADEmKGyYjANM8BOhyXofMh3M14Vto1zfUEJHW9ysA9Rlh3Pz74-_u-pcGX0qbsWGJMIocv3fVOyFy4oEVMZkoslElqwo_e2mXkrQcz" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">ELEGANT HAND PRINTED SAREE</h3>
            <p class="text-[11px] text-gray-500 font-medium">9 products</p>
          </router-link>
          <!-- Category 4: FLORAL SAREE -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Floral Saree" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxJL9LRq9LnofJsG8YMyyLQupnZywPOBP8fXe4E9gNLb-WcBiB2xHgoENP6TkzyRzAjMZpZJOFdq7LCCUUOiALTJe7M87oTPXEAah0yOSqZpWXJYRAdcyA764bg38iCEYfpOt_0STXNxDKU4KJ6V2KqNWhlf4WqzEJoHFgaM80ykQ_F5hIOPZYZYRq-ugNW-QiCE88Z9qjdZrGulJFv5D5cu0MfAPQllCllbCYaESeWL1rMCCK8xDA" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">FLORAL SAREE</h3>
            <p class="text-[11px] text-gray-500 font-medium">30 products</p>
          </router-link>
          <!-- Category 5: LEHENGA -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Festive Lehenga" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFC-rg2_CC_EUxoLTx4GOzyNqCbpBRrLaYhZ7mAi9UBqhEvkV6GWrs9WuJ4Kpj1NVzHi_o-38OkB6KaLpacdCWP4QwjJJiawZxRb81E5xKWeg0sLlJiQS8Oja80o3WiVAvVcQEtDuZdm_T9ipBIwiaIJJGLgRzFPkEuiVvsy2ZSGF_Um2LzEt7FDBZBphQdselJtfsHY7BGyFOPPYWII0WPBbtkKEh2cfgaG0LpphXQNnshHrVMZZw" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">LEHENGA</h3>
            <p class="text-[11px] text-gray-500 font-medium">26 products</p>
          </router-link>
          <!-- Category 6: HIJAB -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Chiffon and Silk Hijabs" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8Y0h0r3uiZUjVp0l0KXMrDpHjaTNTGAMsk6TN7cln_jyUqOdW_cUc4ND4JibBSvX0I1rbtt2S3IYmglcdTpL9yAHgWF4KFbDCRSvU4cM53x5Ow5G8r_WDr5RWq7O2zU5pLNC5IZX3duEzvhk9u9n6JnMrEEO7_XxSAN-Gjo95t7wJwEktOt4Cq3W4i0w9YT1QBc88YB2u97XG8sTOnenODsUPg-h2Uw1-cdhs2USrqvfwy2EbHF9" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">HIJAB</h3>
            <p class="text-[11px] text-gray-500 font-medium">28 products</p>
          </router-link>
        </div>
      </div>
    </section>
    <!-- END: WomenCategories -->

    <!-- BEGIN: HandPrintedSareeSplitSection -->
    <section class="py-10 bg-slate-50 border-t border-b border-gray-200" data-purpose="saree-showcase" id="product-showcase">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Large Promo Banner with Model in Blue Floral Saree -->
          <div class="lg:col-span-4 relative rounded-lg overflow-hidden group shadow-md aspect-[3/4] lg:aspect-auto h-full min-h-[380px]">
            <img 
              alt="Model wearing Elegant Hand Printed Saree" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdvDH6UhRwMB7WiY3EiqIkBPdzJLdviUsdcHXwg49Nk9AJb3GUZxoFBC2JnYdrflwEPQYGuYOQjbm81KlspJb3cPNTE5HebHIPCazyKc-nQqaxuIUR72Lai1iWUSwMgPE7_bLubGn_FLEODMncDBSBL3gFJAsA47HvqfG45uieWMGCHi7RwaH7EsmFCgb51mcJ1DqRPAgmEB_i66gxq1aYObbdriXReP0JcRv4r-T_ygV0weA-2gVb" 
              decoding="async" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span class="text-amber-400 font-bold uppercase tracking-wider text-xs">Exclusive Organza &amp; Silk</span>
              <h3 class="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
                Elegant Hand Printed Saree
              </h3>
              <p class="text-gray-200 text-xs sm:text-sm mb-4">
                Delicate floral artwork hand-rendered on gossamer organza, georgette, and pure soft fabrics.
              </p>
              <div>
                <router-link 
                  to="/category" 
                  class="inline-flex items-center gap-1.5 bg-[#ba1a2e] hover:bg-[#92001d] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Shop Saree Collection</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right Grid: 10 Sarees using the exact MensPanjabiShowcase grid & card design -->
          <div class="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <ProductCard 
              v-for="product in sareeProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>
        </div>
      </div>
    </section>
    <!-- END: HandPrintedSareeSplitSection -->

    <!-- BEGIN: OthersCategoriesSection -->
    <section class="py-12 bg-white" data-purpose="others-categories" id="others-categories">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="mb-8">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-wide text-gray-900">
            OTHERS CATEGORIES
          </h2>
        </div>
        <!-- 4 Other Category Cards (Tote Bag, Kids, Men's Panjabi, Jewellary) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <!-- Tote Bag -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Embroidered Canvas Tote Bags" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-cgySOzIiPp1INY-dq10TUTmJyIDeLIRQGV_MqAY6taMdOShm86iaqO2awtddYEZLxOYhPeR4gnzhexpwk_yjxDXKNhDQRdnphbv60W1wqAGVJtui3CiudrFKJz0nj1HYS3Vcn0qskJHAgcHHlBcqLGT-bu0_sSgyj1p4lXzP_Uaq8N5XPLtBQsmyswmorIhSFzDZJVC2n7adE4t8tZ6XR97gZ1QdZDmpBtFFIY1YS1Ik6bKVlsrX" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">TOTE BAG</h3>
            <p class="text-[11px] text-gray-500 font-medium">9 products</p>
          </router-link>
          <!-- Kids -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Kids Festive Dress" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZd8n6pYBSftkn5SeciiiH8i4-DlgDHsPobxuvqbsk1korIN5nDN64LSVHmfaKJ3jRWx5LDiWG4qP8xcvArW7qQdoSy2hq2e8DvMIs-5_SuLNEXeks3UUBnO7-licLydj6ETsyMuuFnyC1dV7FNHJ7yPJQ-E5ieKrINWN_AFZVBTQEkw7vaCUX6i2lDyrJGMUpbD0AIhgtYTU3rX6uLFLaxgdkLFyMGquwSB4V9oDG5yIraFAEAVlx" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">KIDS</h3>
            <p class="text-[11px] text-gray-500 font-medium">9 products</p>
          </router-link>
          <!-- Men's Panjabi -->
          <a class="group block text-center" href="#panjabi-section">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Men's Panjabi Festive" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8AMrzv0_ID56CzzXFSPJiolpG0R0AQkMsSDhhpQHSrAE6nbO8gwbWB4137FE9bTGsXcj5kCOkyiVRhv1HTWufcDlR9J6wRfk9if-iK-__2IFAk2vNCylgg3bQv0jLCKPtv95tPPX5y99sKl1AA9ryWQQCj72xOAE6zkWSHdD4ohbnPuwF9LwBDIgPyNhpI1ewD0p5S9pDSx-_4g9agcQXIJQ8PYdAZZEDbP3Kj30vWah7asbTXGh" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">MEN'S PANJABI</h3>
            <p class="text-[11px] text-gray-500 font-medium">17 products</p>
          </a>
          <!-- Jewellary -->
          <router-link class="group block text-center" to="/category">
            <div class="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4] mb-3 shadow-xs">
              <img alt="Traditional and contemporary jewellery" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvotEPkLnqpS2wc_2V3xrrVCCZ7GTORLKNSSOhLnJpdaPRraXNY0819Ix7NoybClQQYtVBPH1YULzEYDIdvalehBXf3WWHHen-UKl5gHE994h0INkpGAj3T5njUW-wa6tORSXozCJ9V5gBTnwMAH0EoVYno1n5p-AtvSU6Cy0QMEDVMz6U9s2RHCJdeYo4k59jfZJBMEpyrRfPHsvORwrkT8VlcjAM8ADZXLi-chsZ8onyGrlYKOwC" decoding="async" loading="lazy">
            </div>
            <h3 class="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-red-700 transition">JEWELLARY</h3>
            <p class="text-[11px] text-gray-500 font-medium">0 products</p>
          </router-link>
        </div>
      </div>
    </section>
    <!-- END: OthersCategoriesSection -->

    <!-- BEGIN: MensPanjabiShowcase -->
    <section class="py-10 bg-slate-50 border-t border-gray-200" data-purpose="mens-panjabi-grid" id="panjabi-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Banner (Tall photo of men in festive panjabis) -->
          <div class="lg:col-span-4 relative rounded-lg overflow-hidden group shadow-md aspect-[3/4] lg:aspect-auto h-full min-h-[380px]">
            <img 
              alt="Male models in embroidered Eid panjabis" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-SHkr-VwGN40RyynwjkdIx5G-kpxzdSa5NwsMBSKmfM3VCnfa7cUTbVThniFXcmG2_SWcdpMzGngcfGT_VXRaLqfI-BGtk97TqqYWWVjKoACKnBZ4-n5o3jxiFLVqS67Bv4YHVKuDp_wyrH1VITNShgcNEHArbLpOmWC7wUPmQJwIR0_DZezWm4IOSq0foHUQ5rHZEiwW0YaOAX2l8JwJGYAkxIUeALZ1_OXZq0vnNi_TFc5IoNk4" 
              decoding="async" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span class="text-amber-400 font-bold uppercase tracking-wider text-xs">Festive &amp; Wedding Collection</span>
              <h3 class="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
                Men's Designer Panjabi
              </h3>
              <p class="text-gray-200 text-xs sm:text-sm mb-4">
                Exquisite cotton, silk, tribal print, and delicate thread embroidery crafted for festive moments.
              </p>
              <div>
                <router-link 
                  to="/category" 
                  class="inline-flex items-center gap-1.5 bg-[#ba1a2e] hover:bg-[#92001d] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Shop All Panjabis</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right Grid of 10 Panjabis -->
          <div class="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <ProductCard 
              v-for="product in panjabiProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>
        </div>
      </div>
    </section>
    <!-- END: MensPanjabiShowcase -->

    <!-- BEGIN: TestimonialsSection -->
    <section class="py-16 bg-white border-b border-gray-200" data-purpose="testimonials" id="testimonials">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span class="text-xs font-bold text-red-700 uppercase tracking-widest block mb-1">TESTIMONIALS</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-serif">Customer Reviews</h2>
        <p class="text-xs sm:text-sm text-gray-500 mb-10">They have already used our services</p>
        <!-- Testimonial Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <!-- Testimonial 1 -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                  AO
                </div>
                <div>
                  <h4 class="font-bold text-sm text-gray-900">Arts of shop</h4>
                  <span class="text-[11px] text-gray-500">Verified Reviewer</span>
                </div>
              </div>
              <div class="flex items-center space-x-1 text-amber-500 text-xs mb-3">
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="font-bold text-gray-700 ml-1">5/5</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4">
                "sobar posondher akta rose flower saree. Fabric quality and hand print color were exactly as pictured!"
              </p>
            </div>
            <div class="flex items-center space-x-2 pt-3 border-t border-gray-200 text-xs">
              <img alt="Rosess pink" class="w-8 h-8 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKf7Pc4Gyer0Wo9M6_cEAMp3Lxvn6kpQdqtYNLt-NO-MXZ4hju6ZPbzCIUkOXxyMAiNYeIn5SlFTARRdxIZD7uE2y_LdXgEbisyE1qdqI-LeYjAoCDkgdPc9FMzT_x56npIJ-WPatkFtdS3lMEEk6Q-lXMeDlvK5wffA9W8zWRxth05flOFTIS680nbwRy5mWSa8gPKnGJ8JLw46PInDNN_C560t01hfG1HQCkCBKYwjAtrPcEr5vi" decoding="async" loading="lazy">
              <div>
                <router-link to="/single" class="font-semibold text-red-700 hover:underline block leading-tight">Rosess pink</router-link>
                <span class="text-[10px] text-gray-400">1 month ago</span>
              </div>
            </div>
          </div>
          <!-- Testimonial 2 -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                  AO
                </div>
                <div>
                  <h4 class="font-bold text-sm text-gray-900">Arts of shop</h4>
                  <span class="text-[11px] text-gray-500">Verified Reviewer</span>
                </div>
              </div>
              <div class="flex items-center space-x-1 text-amber-500 text-xs mb-3">
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="font-bold text-gray-700 ml-1">5/5</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4">
                "alhamdullila, smooth delivery on time before the festival and the organza finish was magnificent."
              </p>
            </div>
            <div class="flex items-center space-x-2 pt-3 border-t border-gray-200 text-xs">
              <img alt="Mint Blossom" class="w-8 h-8 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC05XZ0M0kdCkFkZHRURCSkVzbpcIdfyg1MOC7qN4490RgdTvfSipfcMv7g7k7mNNFA07_fMXF3oi63za0yzgNK8q0u0YdoU9LCH1QAwna_EOuSWixaKz_BDFBglSCjM_tQ9vCptv7cfEEdXp-kJr5Iep4jh8DriQTMY0cl0nL6d7-LuOoasCktF5HkyifHEHo41F59ORv4V87rnIie4E97ZqtVUkTBAzx_WnuSTPn9EcNxS0yQrf6d" decoding="async" loading="lazy">
              <div>
                <router-link to="/single" class="font-semibold text-red-700 hover:underline block leading-tight">Mint Blossom</router-link>
                <span class="text-[10px] text-gray-400">3 months ago</span>
              </div>
            </div>
          </div>
          <!-- Testimonial 3 -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                  AO
                </div>
                <div>
                  <h4 class="font-bold text-sm text-gray-900">Arts of shop</h4>
                  <span class="text-[11px] text-gray-500">Verified Reviewer</span>
                </div>
              </div>
              <div class="flex items-center space-x-1 text-amber-500 text-xs mb-3">
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
                <span class="font-bold text-gray-700 ml-1">5/5</span>
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4">
                "ma sha allah, fitting for the men's panjabi was perfect. Very comfortable in hot weather as well."
              </p>
            </div>
            <div class="flex items-center space-x-2 pt-3 border-t border-gray-200 text-xs">
              <img alt="Organza floral three pis" class="w-8 h-8 rounded object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbl2lgOiP1lsV3b0s-CVHKDAM-N-mf4s7jcCvC8QnGxomNzT23_jQC2rB6DTRn50ZWCJmfpJjww9BOI2jaDc7jjTG5Vz6MWeyd6PKa2QjWhcKsklNBn4IKZ0ZY9fbVTIPy-dqV5HVBw2j3MZ6IP_rBxHywhnA49YgHpU12KR1cPGFFQol57b5Vj9A9weMRCW21u8bg9abL6OjtfQTbDPbndQ9ecNg1A46pmqF7jQcUl5rq7hiw-ZTr" decoding="async" loading="lazy">
              <div>
                <router-link to="/single" class="font-semibold text-red-700 hover:underline block leading-tight">Organza floral three pis</router-link>
                <span class="text-[10px] text-gray-400">5 months ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END: TestimonialsSection -->
  </main>
</template>
