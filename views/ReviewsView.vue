<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'

const { showToast } = useCart()

const activeFilter = ref('all')
const lightboxImage = ref(null)
const isModalOpen = ref(false)

// New review form state
const newReviewName = ref('')
const newReviewRating = ref(5)
const newReviewProduct = ref('Elegant Hand Printed Saree')
const newReviewComment = ref('')

const reviews = ref([
  {
    id: 1,
    author: 'Nusrat Jahan',
    location: 'Gulshan 2, Dhaka',
    date: '2 days ago',
    verified: true,
    rating: 5,
    category: 'saree',
    productTitle: 'Soft Peach White Floral Organza Saree',
    comment: 'Alhamdullila! The hand print finishing and organza quality exceeded my expectations. Wore it to my cousin\'s engagement ceremony and received endless compliments. Delivery inside Dhaka took less than 24 hours!',
    helpfulCount: 24,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdvDH6UhRwMB7WiY3EiqIkBPdzJLdviUsdcHXwg49Nk9AJb3GUZxoFBC2JnYdrflwEPQYGuYOQjbm81KlspJb3cPNTE5HebHIPCazyKc-nQqaxuIUR72Lai1iWUSwMgPE7_bLubGn_FLEODMncDBSBL3gFJAsA47HvqfG45uieWMGCHi7RwaH7EsmFCgb51mcJ1DqRPAgmEB_i66gxq1aYObbdriXReP0JcRv4r-T_ygV0weA-2gVb',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKf7Pc4Gyer0Wo9M6_cEAMp3Lxvn6kpQdqtYNLt-NO-MXZ4hju6ZPbzCIUkOXxyMAiNYeIn5SlFTARRdxIZD7uE2y_LdXgEbisyE1qdqI-LeYjAoCDkgdPc9FMzT_x56npIJ-WPatkFtdS3lMEEk6Q-lXMeDlvK5wffA9W8zWRxth05flOFTIS680nbwRy5mWSa8gPKnGJ8JLw46PInDNN_C560t01hfG1HQCkCBKYwjAtrPcEr5vi'
    ]
  },
  {
    id: 2,
    author: 'Tanvir Ahmed Chowdhury',
    location: 'Dhanmondi, Dhaka',
    date: '5 days ago',
    verified: true,
    rating: 5,
    category: 'panjabi',
    productTitle: 'Festive Embroidered Silk Panjabi',
    comment: 'Fitting was spot-on. The cotton-silk blend feels very breathable yet holds a regal sheen for Eid prayers and evening family gatherings. Packaging in the Arts of Shop signature monogram box was top tier.',
    helpfulCount: 18,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW8WgLY5KIswpHHYE3C6xibYM-GwMVJCRswrgY2ERfvOYFj45s5uLQOHsnGHAwQiy3Aw3w47YGN5T_FVHwppCNoKzfzTakWNM4yiP-p-vW44qp6jXKg-4HXNy3j27huFpMraIa7stT-UQAfs01N1kv0NnqYni6dJFiBmqLRFIoyV120sJquXSNWD7diUbmU7nASS3diWvIs60pDsfADtzmr82zuJOMuDea9ef_ZO3WgCVb1u-3DtbF'
    ]
  },
  {
    id: 3,
    author: 'Sadia Rahman',
    location: 'Chittagong GEC',
    date: '1 week ago',
    verified: true,
    rating: 5,
    category: 'lehenga',
    productTitle: 'The Saffron Marigold Lehenga',
    comment: 'Ordered from Chittagong and received in 2 days via express courier. The zardozi border work is so intricate and sparkling. Pure luxury boutique level finish at an honest price!',
    helpfulCount: 31,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q'
    ]
  },
  {
    id: 4,
    author: 'Anika Tabassum',
    location: 'Uttara Sector 7, Dhaka',
    date: '2 weeks ago',
    verified: true,
    rating: 5,
    category: 'saree',
    productTitle: 'Royal Botanical Lilac Saree',
    comment: 'The soft pastel tone is gorgeous in daylight photoshoot. Washed with mild detergent as advised and the paint didn\'t fade at all. Definitely buying another piece for my mother.',
    helpfulCount: 15,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ATRmS427aRdL8HnAkd64oNUq-xJT-gY2NPSy5CXGrhAUFXHmGSJZfr_Mn6E9xXhCw7FzXocyfrbhNK4kKrct41v0sB_sNzPZrrcW6K7Vu3FnXHe-YXHE1nTv2dhdDsDTZMDRW48NI2g6aMADEmKGyYjANM8BOhyXofMh3M14Vto1zfUEJHW9ysA9Rlh3Pz74-_u-pcGX0qbsWGJMIocv3fVOyFy4oEVMZkoslElqwo_e2mXkrQcz'
    ]
  },
  {
    id: 5,
    author: 'Dr. Farhana Yasmin',
    location: 'Sylhet Sadar',
    date: '3 weeks ago',
    verified: true,
    rating: 5,
    category: 'saree',
    productTitle: 'Emerald Green Katan Silk Saree',
    comment: 'Draped very comfortably. The weight of the pallu falls gracefully. Customer support on WhatsApp answered all questions regarding blouse matching immediately.',
    helpfulCount: 9,
    images: []
  },
  {
    id: 6,
    author: 'Mahmudul Hasan',
    location: 'Banani, Dhaka',
    date: '1 month ago',
    verified: true,
    rating: 5,
    category: 'panjabi',
    productTitle: 'Ivory Royal Cut Panjabi',
    comment: 'Loved the subtle embroidery on the collar. Cash on delivery was seamless and the rider allowed checking the parcel before payment.',
    helpfulCount: 12,
    images: []
  }
])

const filteredReviews = computed(() => {
  if (activeFilter.value === 'all') return reviews.value
  if (activeFilter.value === 'photos') return reviews.value.filter(r => r.images && r.images.length > 0)
  return reviews.value.filter(r => r.category === activeFilter.value)
})

function openLightbox(imgUrl) {
  lightboxImage.value = imgUrl
}

function closeLightbox() {
  lightboxImage.value = null
}

function upvote(review) {
  review.helpfulCount++
  showToast('Thank you for your feedback!')
}

function submitReview() {
  if (!newReviewName.value.trim() || !newReviewComment.value.trim()) {
    alert('Please fill in your name and review comments.')
    return
  }

  reviews.value.unshift({
    id: Date.now(),
    author: newReviewName.value,
    location: 'Dhaka, Bangladesh',
    date: 'Just now',
    verified: true,
    rating: newReviewRating.value,
    category: 'saree',
    productTitle: newReviewProduct.value,
    comment: newReviewComment.value,
    helpfulCount: 0,
    images: []
  })

  newReviewName.value = ''
  newReviewComment.value = ''
  isModalOpen.value = false
  showToast('Your verified review has been submitted for publication!')
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
          <li class="text-text-muted">Atelier Stories</li>
          <li><span class="text-champagne-gold">/</span></li>
          <li aria-current="page" class="text-text-charcoal font-semibold">Customer Reviews</li>
        </ol>
      </nav>

      <!-- Monograph Luxury Rating Header -->
      <div class="bg-gradient-to-r from-[#0d131f] via-[#16202c] to-[#0d131f] text-white rounded-2xl p-6 sm:p-10 mb-8 border border-[#2d3a4f] shadow-lg relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#ba1a2e]/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <!-- Left: Big Rating Number & Badge -->
          <div class="text-center lg:text-left">
            <span class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#fed488] mb-2 inline-flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px] text-[#ffb703]">verified_user</span>
              VERIFIED ARTISANAL EXPERIENCES
            </span>
            <div class="flex items-baseline justify-center lg:justify-start gap-3 mt-1">
              <span class="font-serif text-5xl sm:text-6xl font-bold text-amber-200">4.9</span>
              <div class="text-left">
                <div class="flex text-amber-400 text-lg">
                  ★★★★★
                </div>
                <p class="text-xs text-gray-300 font-light mt-0.5">Based on 1,420+ verified client orders</p>
              </div>
            </div>
            <p class="text-xs text-gray-400 max-w-md mt-3 font-light">
              Read authentic feedback from patrons across Bangladesh and worldwide who have experienced Arts of Shop heirloom craftsmanship.
            </p>
          </div>

          <!-- Center: Star Rating Bars -->
          <div class="w-full lg:w-72 space-y-1.5 text-xs text-gray-300">
            <div class="flex items-center gap-2">
              <span class="w-12 text-right">5 Star</span>
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400 rounded-full" style="width: 92%"></div>
              </div>
              <span class="w-8 text-right font-medium">92%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-12 text-right">4 Star</span>
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400/80 rounded-full" style="width: 6%"></div>
              </div>
              <span class="w-8 text-right font-medium">6%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-12 text-right">3 Star</span>
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400/60 rounded-full" style="width: 1%"></div>
              </div>
              <span class="w-8 text-right font-medium">1%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-12 text-right">2 Star</span>
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400/40 rounded-full" style="width: 0.5%"></div>
              </div>
              <span class="w-8 text-right font-medium">&lt;1%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-12 text-right">1 Star</span>
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400/20 rounded-full" style="width: 0.5%"></div>
              </div>
              <span class="w-8 text-right font-medium">&lt;1%</span>
            </div>
          </div>

          <!-- Right: Write a Review CTA -->
          <div class="shrink-0 text-center">
            <button 
              type="button" 
              @click="isModalOpen = true"
              class="px-6 py-3.5 bg-primary hover:bg-crimson-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span class="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Write a Review</span>
            </button>
            <p class="text-[11px] text-gray-400 mt-2">Only verified buyers can post photos</p>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border-hairline">
        <div class="flex flex-wrap items-center gap-2">
          <button 
            type="button"
            @click="activeFilter = 'all'"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            :class="activeFilter === 'all' ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
          >
            All Reviews ({{ reviews.length }})
          </button>
          <button 
            type="button"
            @click="activeFilter = 'photos'"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5"
            :class="activeFilter === 'photos' ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
          >
            <span class="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>With Photos (4)</span>
          </button>
          <button 
            type="button"
            @click="activeFilter = 'saree'"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            :class="activeFilter === 'saree' ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
          >
            Sarees
          </button>
          <button 
            type="button"
            @click="activeFilter = 'panjabi'"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            :class="activeFilter === 'panjabi' ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
          >
            Panjabis
          </button>
          <button 
            type="button"
            @click="activeFilter = 'lehenga'"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            :class="activeFilter === 'lehenga' ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
          >
            Lehengas
          </button>
        </div>

        <div class="text-xs text-text-muted">
          Showing <strong>{{ filteredReviews.length }}</strong> reviews
        </div>
      </div>

      <!-- Reviews Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article 
          v-for="review in filteredReviews" 
          :key="review.id" 
          class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <!-- Header: Author, Badge, Date -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#0d131f] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  {{ review.author.charAt(0) }}
                </div>
                <div>
                  <h3 class="font-bold text-sm text-text-charcoal flex items-center gap-1.5">
                    {{ review.author }}
                    <span v-if="review.verified" class="material-symbols-outlined text-emerald-600 text-[16px]" title="Verified Buyer">
                      verified
                    </span>
                  </h3>
                  <span class="text-[11px] text-text-muted">{{ review.location }}</span>
                </div>
              </div>

              <div class="text-right">
                <div class="text-amber-500 text-xs tracking-wider">
                  {{ '★'.repeat(review.rating) }}
                </div>
                <span class="text-[11px] text-text-muted block mt-0.5">{{ review.date }}</span>
              </div>
            </div>

            <!-- Product Tag -->
            <div class="mb-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-text-charcoal border border-border-hairline">
                <span class="material-symbols-outlined text-[13px] text-primary">sell</span>
                {{ review.productTitle }}
              </span>
            </div>

            <!-- Comment -->
            <p class="text-xs sm:text-sm text-text-charcoal/90 leading-relaxed font-light mb-4">
              "{{ review.comment }}"
            </p>

            <!-- Customer Review Photos with Click-to-Zoom Lightbox -->
            <div v-if="review.images && review.images.length > 0" class="flex flex-wrap gap-2.5 mb-4">
              <div 
                v-for="(img, idx) in review.images" 
                :key="idx" 
                class="relative w-16 h-20 rounded-lg overflow-hidden border border-border-hairline shadow-xs cursor-pointer group/img"
                @click="openLightbox(img)"
                title="Click to view full photo"
              >
                <img :src="img" :alt="review.productTitle" class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-[18px]">zoom_in</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom: Helpful Count & Recommendation -->
          <div class="pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
            <span class="text-emerald-700 font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">thumb_up</span>
              Recommends this Atelier piece
            </span>
            <button 
              type="button" 
              @click="upvote(review)" 
              class="hover:text-primary transition-colors cursor-pointer flex items-center gap-1 font-medium"
            >
              <span>Helpful</span>
              <span class="font-bold">({{ review.helpfulCount }})</span>
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
      @click="closeLightbox"
    >
      <div class="relative max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black" @click.stop>
        <button 
          type="button" 
          class="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 cursor-pointer z-10"
          @click="closeLightbox"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
        <img :src="lightboxImage" alt="Customer review photo preview" class="w-full h-full object-contain max-h-[80vh]" />
      </div>
    </div>

    <!-- Write a Review Modal -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      @click="isModalOpen = false"
    >
      <div 
        class="bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5"
        @click.stop
      >
        <div class="flex items-center justify-between pb-3 border-b border-border-hairline">
          <div>
            <h3 class="font-serif font-bold text-xl text-text-charcoal">Write a Customer Review</h3>
            <p class="text-xs text-text-muted mt-0.5">Share your experience with fellow patrons</p>
          </div>
          <button 
            type="button" 
            @click="isModalOpen = false"
            class="text-text-muted hover:text-text-charcoal p-1 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <form @submit.prevent="submitReview" class="space-y-4 text-xs">
          <!-- Rating Stars -->
          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1.5">Rating *</label>
            <div class="flex gap-2 text-2xl text-amber-400 cursor-pointer">
              <span 
                v-for="star in 5" 
                :key="star" 
                @click="newReviewRating = star"
                class="hover:scale-110 transition-transform"
              >
                {{ star <= newReviewRating ? '★' : '☆' }}
              </span>
            </div>
          </div>

          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Your Full Name *</label>
            <input 
              v-model="newReviewName" 
              required 
              type="text" 
              placeholder="e.g. Nusrat Jahan"
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            />
          </div>

          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Product Purchased *</label>
            <select 
              v-model="newReviewProduct" 
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm cursor-pointer"
            >
              <option value="Soft Peach White Floral Organza Saree">Soft Peach White Floral Organza Saree</option>
              <option value="The Saffron Marigold Lehenga">The Saffron Marigold Lehenga</option>
              <option value="Festive Embroidered Silk Panjabi">Festive Embroidered Silk Panjabi</option>
              <option value="Royal Botanical Lilac Saree">Royal Botanical Lilac Saree</option>
              <option value="Floral Three Piece Ensemble">Floral Three Piece Ensemble</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-text-charcoal uppercase tracking-wider mb-1">Review Details *</label>
            <textarea 
              v-model="newReviewComment" 
              required 
              rows="4" 
              placeholder="Describe the fabric quality, color accuracy, stitching fit, and delivery experience..."
              class="w-full p-3 rounded-lg border border-border-hairline bg-slate-50 focus:bg-white focus:border-primary focus:outline-none text-xs sm:text-sm"
            ></textarea>
          </div>

          <div class="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              @click="isModalOpen = false" 
              class="px-4 py-2.5 rounded-lg border border-border-hairline text-text-charcoal font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-6 py-2.5 rounded-lg bg-primary hover:bg-crimson-hover text-white font-bold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
