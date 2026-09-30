<script setup>
import { ref, computed } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const gridCols = ref(4)
const maxPrice = ref(15000)
const selectedCategories = ref(['Bridal Lehenga'])
const selectedFabrics = ref(['Pure Silk Organza'])
const selectedPalette = ref('')
const availability = ref('ready')
const sortBy = ref('featured')

const filteredProducts = computed(() => {
  let list = [...products]
  
  // Category filter
  if (selectedCategories.value.length > 0) {
    list = list.filter(p => {
      if (selectedCategories.value.includes('Bridal Lehenga') && p.category === 'lehenga') return true
      if (selectedCategories.value.includes('Floral Saree') && p.category === 'saree') return true
      if (selectedCategories.value.includes("Men's Panjabi") && p.category === 'panjabi') return true
      return false
    })
  }

  // Price filter
  list = list.filter(p => p.price <= maxPrice.value)

  // Sort
  if (sortBy.value === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  }

  // If empty, fallback to all lehengas/sarees
  return list.length ? list : products.filter(p => p.category === 'lehenga')
})

function clearFilters() {
  maxPrice.value = 15000
  selectedCategories.value = ['Bridal Lehenga']
  selectedFabrics.value = []
  selectedPalette.value = ''
  availability.value = 'ready'
  sortBy.value = 'featured'
}

function removeCategory(cat) {
  selectedCategories.value = selectedCategories.value.filter(c => c !== cat)
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
          <li class="hover:text-primary transition-colors cursor-pointer">Curated Atelier</li>
          <li><span class="text-champagne-gold">/</span></li>
          <li aria-current="page" class="text-text-charcoal font-semibold">Bridal &amp; Festive Collection</li>
        </ol>
      </nav>

      <!-- Editorial Monograph Banner / Heading -->
      <div class="relative bg-gradient-to-r from-[#0d131f] via-[#16202c] to-[#0d131f] text-white rounded-2xl p-6 sm:p-10 mb-8 border border-[#2d3a4f] shadow-lg overflow-hidden">
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#ba1a2e]/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#c5a059]/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl">
          <span class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#fed488] mb-2 inline-flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-[#ffb703]">auto_awesome</span>
            Royal Couture Edition • 2026
          </span>
          <h1 class="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Curated Bridal &amp; Festive Heirloom Edit
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-4">
            Handcrafted bridal &amp; festive lehengas, pure silk zardozi embroidery, and heirloom silhouettes curated for grand celebrations.
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
            <span class="inline-flex items-center gap-2 bg-[#ba1a2e] text-white px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-sm">
              <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              {{ filteredProducts.length }} Designs Found
            </span>
            <span class="hidden sm:inline text-gray-500">•</span>
            <span class="flex items-center gap-1.5 text-gray-300">
              <span class="material-symbols-outlined text-[16px] text-amber-400">verified</span>
              Verified Authentic Handcrafted
            </span>
            <span class="hidden sm:inline text-gray-500">•</span>
            <span class="flex items-center gap-1.5 text-gray-300">
              <span class="material-symbols-outlined text-[16px] text-[#25D366]">local_shipping</span>
              Free Delivery Inside Dhaka (৳5,000+)
            </span>
          </div>
        </div>
      </div>

      <!-- Shop Control Toolbar -->
      <div class="bg-surface-card rounded-lg p-space-md shadow-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div class="font-body-sm text-body-sm text-text-muted flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-champagne-gold">auto_awesome</span>
          <span>Showing <strong class="text-text-charcoal font-semibold">1–{{ filteredProducts.length }}</strong> of <strong class="text-text-charcoal font-semibold">30</strong> handwoven creations</span>
        </div>
        <div class="flex items-center gap-space-md w-full sm:w-auto justify-end">
          <!-- Sort Control -->
          <div class="relative flex items-center bg-canvas-cream rounded-lg px-3 py-1.5 shadow-inner">
            <label class="font-label-xs text-label-xs uppercase text-text-muted pr-2 whitespace-nowrap" for="sort-select">Sort By:</label>
            <select 
              v-model="sortBy"
              class="bg-transparent font-label-sm text-label-sm text-text-charcoal font-medium focus:outline-none cursor-pointer pr-4" 
              id="sort-select"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
          <!-- Grid View Toggles -->
          <div class="flex items-center bg-canvas-cream p-1 rounded-lg gap-1">
            <button 
              type="button"
              @click="gridCols = 3"
              class="p-1.5 rounded transition-colors shadow-sm cursor-pointer" 
              :class="gridCols === 3 ? 'bg-surface-card text-primary' : 'text-text-muted hover:text-text-charcoal'"
              title="Standard 3-Column View"
            >
              <span class="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button 
              type="button"
              @click="gridCols = 4"
              class="p-1.5 rounded transition-colors shadow-sm cursor-pointer" 
              :class="gridCols === 4 ? 'bg-surface-card text-primary' : 'text-text-muted hover:text-text-charcoal'"
              title="Expanded 4-Column View"
            >
              <span class="material-symbols-outlined text-[20px]">view_comfy</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Two-Column Shop Experience -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <!-- Left Sidebar (Curated Filters) -->
        <aside class="lg:col-span-3 space-y-space-md">
          <!-- Filter Header Box -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-primary">tune</span>
              <span class="font-label-lg text-label-lg uppercase tracking-wider text-text-charcoal font-semibold">Refine Selection</span>
            </div>
            <button 
              type="button"
              @click="clearFilters"
              class="font-label-xs text-label-xs uppercase text-primary hover:text-crimson-hover underline tracking-wider cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <!-- Categories Checklist -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm space-y-3">
            <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-text-charcoal font-semibold flex items-center justify-between">
              <span>Atelier Categories</span>
              <span class="material-symbols-outlined text-[18px] text-text-muted">keyboard_arrow_up</span>
            </h2>
            <div class="space-y-2.5 pt-1 font-body-sm text-body-sm text-on-surface-variant">
              <label 
                v-for="cat in categories" 
                :key="cat.name"
                class="flex items-center justify-between cursor-pointer group"
              >
                <span class="flex items-center gap-2.5">
                  <input 
                    type="checkbox" 
                    :value="cat.name" 
                    v-model="selectedCategories"
                    class="w-4 h-4 rounded text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                  />
                  <span class="text-text-charcoal font-medium group-hover:text-primary transition-colors">
                    {{ cat.name }}
                  </span>
                </span>
                <span class="font-label-xs text-[11px] px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-semibold">
                  {{ cat.count }}
                </span>
              </label>
            </div>
          </div>

          <!-- Price Filter (Slider & Display) -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm space-y-3">
            <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-text-charcoal font-semibold">
              Price Range
            </h2>
            <div class="space-y-2 pt-1">
              <input 
                v-model="maxPrice"
                class="w-full accent-primary cursor-pointer" 
                max="25000" 
                min="2000" 
                step="500" 
                type="range"
              />
              <div class="flex items-center justify-between font-label-xs text-label-xs text-text-muted">
                <span>Min: ৳2,000</span>
                <span>Max: <strong class="text-primary font-semibold">৳{{ Number(maxPrice).toLocaleString('en-US') }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Fabric Checklist -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm space-y-3">
            <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-text-charcoal font-semibold">
              Heritage Weave
            </h2>
            <div class="space-y-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  value="Pure Silk Organza" 
                  v-model="selectedFabrics"
                  class="w-4 h-4 rounded text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Pure Silk Organza</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  value="Banarasi Katan Weave" 
                  v-model="selectedFabrics"
                  class="w-4 h-4 rounded text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Banarasi Katan Weave</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  value="Royal Micro-Velvet" 
                  v-model="selectedFabrics"
                  class="w-4 h-4 rounded text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Royal Micro-Velvet</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  value="Chiffon Georgette" 
                  v-model="selectedFabrics"
                  class="w-4 h-4 rounded text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Chiffon Georgette</span>
              </label>
            </div>
          </div>

          <!-- Color Swatches -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm space-y-3">
            <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-text-charcoal font-semibold">Palette Tone</h2>
            <div class="flex items-center gap-2.5 pt-1">
              <button 
                type="button"
                @click="selectedPalette = 'crimson'"
                class="w-7 h-7 rounded-full bg-primary-container ring-2 ring-offset-2 ring-primary-container shadow-sm transition-transform hover:scale-110 cursor-pointer" 
                title="Crimson Red"
              ></button>
              <button 
                type="button"
                @click="selectedPalette = 'saffron'"
                class="w-7 h-7 rounded-full bg-secondary-container hover:ring-2 hover:ring-offset-2 hover:ring-secondary-container shadow-sm transition-transform hover:scale-110 cursor-pointer" 
                title="Saffron Gold"
              ></button>
              <button 
                type="button"
                @click="selectedPalette = 'mint'"
                class="w-7 h-7 rounded-full bg-tertiary-fixed-dim hover:ring-2 hover:ring-offset-2 hover:ring-tertiary-fixed-dim shadow-sm transition-transform hover:scale-110 cursor-pointer" 
                title="Mint Sage"
              ></button>
              <button 
                type="button"
                @click="selectedPalette = 'ivory'"
                class="w-7 h-7 rounded-full bg-surface-bright shadow-inner hover:ring-2 hover:ring-offset-2 hover:ring-border-hairline transition-transform hover:scale-110 cursor-pointer" 
                title="Ivory White"
              ></button>
              <button 
                type="button"
                @click="selectedPalette = 'blue'"
                class="w-7 h-7 rounded-full bg-tertiary-container hover:ring-2 hover:ring-offset-2 hover:ring-tertiary-container shadow-sm transition-transform hover:scale-110 cursor-pointer" 
                title="Midnight Blue"
              ></button>
            </div>
          </div>

          <!-- Availability -->
          <div class="bg-surface-card rounded-lg p-space-md shadow-sm space-y-3">
            <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-text-charcoal font-semibold">
              Production Status
            </h2>
            <div class="space-y-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  value="ready" 
                  v-model="availability"
                  class="w-4 h-4 text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Ready in Dhaka Boutique</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  value="bespoke" 
                  v-model="availability"
                  class="w-4 h-4 text-crimson-primary focus:ring-0 accent-crimson-primary cursor-pointer" 
                />
                <span>Bespoke Made-to-Measure (14 Days)</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Right Column: Product Cards Grid -->
        <section class="lg:col-span-9 space-y-space-xl">
          <!-- Active Filter Tags -->
          <div class="flex flex-wrap items-center gap-2 mb-4" v-if="selectedCategories.length > 0">
            <span 
              v-for="cat in selectedCategories" 
              :key="cat"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary text-xs font-semibold"
            >
              {{ cat }}
              <button type="button" @click="removeCategory(cat)" class="hover:text-crimson-hover cursor-pointer">
                <span class="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-text-charcoal text-xs font-semibold">
              Under ৳{{ Number(maxPrice).toLocaleString('en-US') }}
            </span>
          </div>

          <!-- Product Cards Grid with dynamic columns -->
          <div 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md transition-all"
            :class="gridCols === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'"
          >
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>

          <!-- Pagination -->
          <div class="pt-8 border-t border-border-hairline flex items-center justify-between">
            <span class="text-xs text-text-muted">
              Showing 1–{{ filteredProducts.length }} of 30 items
            </span>
            <div class="flex items-center gap-1 text-xs font-semibold">
              <button class="px-3 py-1.5 rounded border border-border-hairline hover:bg-slate-50 text-text-muted" disabled>
                Previous
              </button>
              <button class="px-3 py-1.5 rounded bg-primary text-white font-bold">1</button>
              <button class="px-3 py-1.5 rounded border border-border-hairline hover:bg-slate-50 text-text-charcoal">2</button>
              <button class="px-3 py-1.5 rounded border border-border-hairline hover:bg-slate-50 text-text-charcoal">3</button>
              <button class="px-3 py-1.5 rounded border border-border-hairline hover:bg-slate-50 text-text-charcoal">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
