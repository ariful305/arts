<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const openItem = ref(1) // first FAQ open by default

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'tailoring', label: 'Custom Tailoring & Blouse' },
  { id: 'delivery', label: 'Delivery & Shipping' },
  { id: 'payment', label: 'Payment & Cash on Delivery' },
  { id: 'returns', label: 'Exchanges & Policy' },
  { id: 'care', label: 'Fabric Care' }
]

const faqs = [
  {
    id: 1,
    category: 'tailoring',
    question: 'Can I get custom blouse stitching or dress alterations with my order?',
    answer: 'Yes, absolutely! At Arts of Shop, we offer bespoke in-house tailoring services from our Banani Atelier. During checkout, you can specify your exact bust, waist, and sleeve measurements in the "Special Instructions & Custom Tailoring" box, or click the quick chips (+ Custom Blouse Stitching). Our master tailor will also WhatsApp you to confirm measurements before stitching.'
  },
  {
    id: 2,
    category: 'delivery',
    question: 'How long does nationwide delivery take inside and outside Dhaka?',
    answer: 'Orders within Dhaka Metropolitan area are delivered within 24 to 48 hours via our express courier service (৳70). For deliveries outside Dhaka (all 64 districts in Bangladesh), delivery typically takes 2 to 4 business days (৳150). You can also select your preferred morning, afternoon, or evening delivery time window at checkout.'
  },
  {
    id: 3,
    category: 'payment',
    question: 'Is Cash on Delivery (COD) available across Bangladesh?',
    answer: 'Yes! We proudly offer Nationwide Cash on Delivery (COD) across all districts of Bangladesh. You can verify your sealed parcel with the courier rider upon delivery before completing payment.'
  },
  {
    id: 4,
    category: 'payment',
    question: 'What digital payment methods do you accept?',
    answer: 'We accept instant verified digital payments via bKash Merchant Gateway, Nagad Direct, and all major Credit and Debit Cards (Visa, Mastercard, American Express) protected with 256-bit 3D-Secure encryption.'
  },
  {
    id: 5,
    category: 'returns',
    question: 'What is your exchange and return policy?',
    answer: 'We accept size and item exchanges within 3 days of delivery if the product is unworn, unwashed, and in its original packaging with all security tags intact. For customized bespoke stitched garments, alterations are handled complimentary at our Banani Atelier.'
  },
  {
    id: 6,
    category: 'care',
    question: 'How should I wash and care for hand-printed organza and silk sarees?',
    answer: 'Hand-printed organza and pure silk heirloom garments should ideally be dry cleaned. If hand washing at home, use cold water with mild shampoo or liquid detergent. Never wring or twist the fabric; press gently between dry towels and dry in shade away from direct harsh sunlight. Iron on reverse side using low silk heat.'
  },
  {
    id: 7,
    category: 'delivery',
    question: 'Do you deliver internationally to USA, UK, Canada, and Europe?',
    answer: 'Yes! We ship our festive and bridal collections internationally via DHL Express and FedEx. International delivery typically takes 4–7 business days. Please reach out to our WhatsApp stylist at +880 1302-694680 for international shipping quotes and customs support.'
  },
  {
    id: 8,
    category: 'tailoring',
    question: 'Can I visit the Banani Atelier studio in Dhaka for in-person fitting?',
    answer: 'Yes, we warmly welcome visitors! Our flagship studio is located at Road 11, Block D, Banani, Dhaka. You can view fabric swatches, sample embroidery cuts, and take precise measurements with our master tailors.'
  }
]

const filteredFaqs = computed(() => {
  return faqs.filter(faq => {
    const matchesCategory = selectedCategory.value === 'all' || faq.category === selectedCategory.value
    const matchesSearch = !searchQuery.value.trim() || 
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

function toggleFaq(id) {
  openItem.value = openItem.value === id ? null : id
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
          <li class="text-text-muted">Client Assistance</li>
          <li><span class="text-champagne-gold">/</span></li>
          <li aria-current="page" class="text-text-charcoal font-semibold">Frequently Asked Questions</li>
        </ol>
      </nav>

      <!-- Monograph Luxury FAQ Header -->
      <div class="bg-gradient-to-r from-[#0d131f] via-[#16202c] to-[#0d131f] text-white rounded-2xl p-6 sm:p-10 mb-8 border border-[#2d3a4f] shadow-lg relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#ba1a2e]/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-2xl mx-auto text-center space-y-3">
          <span class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#fed488] inline-flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-[#ffb703]">help</span>
            HELP &amp; ATELIER GUIDANCE
          </span>
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 font-light">
            Everything you need to know about our heirloom fabrics, custom blouse tailoring, nationwide COD, and care instructions.
          </p>

          <!-- Search Input inside Header -->
          <div class="pt-4 max-w-lg mx-auto">
            <div class="relative flex items-center">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search questions (e.g. tailoring, delivery, wash care)..."
                class="w-full py-3.5 pl-11 pr-4 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-text-charcoal placeholder:text-gray-300 focus:placeholder:text-gray-400 rounded-xl border border-white/20 focus:border-white focus:outline-none transition text-xs sm:text-sm shadow-inner"
              />
              <span class="material-symbols-outlined absolute left-3.5 text-gray-300 pointer-events-none text-[20px]">
                search
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          type="button"
          @click="selectedCategory = cat.id"
          class="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer"
          :class="selectedCategory === cat.id ? 'bg-[#ba1a2e] text-white shadow-xs' : 'bg-surface-card border border-border-hairline text-text-charcoal hover:bg-slate-50'"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Accordion Section -->
      <div class="max-w-3xl mx-auto space-y-3.5">
        <div 
          v-for="faq in filteredFaqs" 
          :key="faq.id"
          class="bg-surface-card rounded-2xl border border-border-hairline overflow-hidden shadow-xs transition"
          :class="openItem === faq.id ? 'border-primary/40 ring-1 ring-primary/20' : 'hover:border-gray-300'"
        >
          <!-- Accordion Title Bar -->
          <button 
            type="button"
            @click="toggleFaq(faq.id)"
            class="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
          >
            <span class="font-serif font-bold text-sm sm:text-base text-text-charcoal leading-snug">
              {{ faq.question }}
            </span>
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-text-charcoal shrink-0 transition-transform duration-300"
              :class="openItem === faq.id ? 'rotate-180 bg-primary/10 text-primary' : ''"
            >
              <span class="material-symbols-outlined text-[20px]">expand_more</span>
            </div>
          </button>

          <!-- Accordion Answer -->
          <div 
            v-show="openItem === faq.id" 
            class="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-muted leading-relaxed font-light border-t border-border-subtle"
          >
            <p>{{ faq.answer }}</p>
          </div>
        </div>

        <!-- No Results Found -->
        <div v-if="filteredFaqs.length === 0" class="text-center py-12 bg-surface-card rounded-2xl border border-border-hairline p-8 space-y-3">
          <span class="material-symbols-outlined text-[40px] text-text-muted">search_off</span>
          <h3 class="font-serif font-bold text-base text-text-charcoal">No questions found matching "{{ searchQuery }}"</h3>
          <p class="text-xs text-text-muted">Try clearing your search query or ask our stylist on WhatsApp directly.</p>
          <button 
            type="button" 
            @click="searchQuery = ''; selectedCategory = 'all'" 
            class="mt-2 text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Still Have Questions Callout Box -->
      <div class="max-w-3xl mx-auto mt-12 bg-[#fdf8f8] border border-red-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <div class="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[32px]">support_agent</span>
          </div>
          <div>
            <h3 class="font-serif font-bold text-base sm:text-lg text-text-charcoal">Still have questions?</h3>
            <p class="text-xs text-text-muted mt-0.5">Our Banani stylists and master tailors are available daily from 10 AM to 9 PM.</p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <a 
            href="https://wa.me/8801302694680?text=Hello%20Arts%20of%20Shop%20I%20have%20a%20question" 
            target="_blank"
            class="px-5 py-2.5 bg-whatsapp-green hover:brightness-105 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-xs"
          >
            <span class="material-symbols-outlined text-[17px]">chat</span>
            <span>WhatsApp Us</span>
          </a>
          <router-link 
            to="/contact" 
            class="px-5 py-2.5 bg-surface-card border border-border-hairline hover:bg-white text-text-charcoal rounded-lg text-xs font-bold uppercase tracking-wider transition"
          >
            Contact Studio
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
