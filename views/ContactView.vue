<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'

const { showToast } = useCart()

const name = ref('')
const phone = ref('')
const email = ref('')
const subject = ref('Bespoke Tailoring & Measurements')
const message = ref('')
const isSubmitted = ref(false)

function handleSubmit() {
  if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
    alert('Please fill in your Name, Phone Number, and Message.')
    return
  }

  isSubmitted.value = true
  showToast('Thank you! Your message has been received by our Banani Atelier team.')
}

function resetForm() {
  name.value = ''
  phone.value = ''
  email.value = ''
  message.value = ''
  isSubmitted.value = false
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
          <li class="text-text-muted">Atelier Studio</li>
          <li><span class="text-champagne-gold">/</span></li>
          <li aria-current="page" class="text-text-charcoal font-semibold">Contact Us</li>
        </ol>
      </nav>

      <!-- Monograph Luxury Contact Header -->
      <div class="bg-gradient-to-r from-[#0d131f] via-[#16202c] to-[#0d131f] text-white rounded-2xl p-6 sm:p-10 mb-8 border border-[#2d3a4f] shadow-lg relative overflow-hidden">
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#ba1a2e]/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 max-w-2xl">
          <span class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#fed488] mb-2 inline-flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-[#ffb703]">location_on</span>
            BANANI ATELIER STUDIO • DHAKA
          </span>
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Connect with Arts of Shop
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Whether you wish to enquire about custom bridal measurements, track an existing festive order, or book a private fitting consultation, our team is at your service.
          </p>
        </div>
      </div>

      <!-- Main Contact Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- LEFT: Interactive Inquiry Form -->
        <section class="lg:col-span-7 bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 shadow-xs">
          <!-- Success State -->
          <div v-if="isSubmitted" class="py-8 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span class="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 class="font-serif font-bold text-2xl text-text-charcoal">Message Sent Successfully!</h3>
            <p class="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
              Thank you, <strong>{{ name }}</strong>. A senior stylist from our Banani Atelier will reach out to you at <strong>{{ phone }}</strong> within 2 hours.
            </p>
            <div class="pt-2 flex justify-center gap-3">
              <button 
                type="button" 
                @click="resetForm" 
                class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-text-charcoal rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Send Another Message
              </button>
              <a 
                href="https://wa.me/8801302694680" 
                target="_blank"
                class="px-5 py-2.5 bg-whatsapp-green hover:brightness-105 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-xs"
              >
                <span class="material-symbols-outlined text-[17px]">chat</span>
                WhatsApp Direct
              </a>
            </div>
          </div>

          <!-- Active Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <div class="border-b border-border-hairline pb-3">
              <h2 class="font-serif font-bold text-lg sm:text-xl text-text-charcoal flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">mail</span>
                <span>Send Us an Inquiry</span>
              </h2>
              <p class="text-xs text-text-muted mt-0.5">Please provide your details and requirements below.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="contact-name">
                  Your Full Name *
                </label>
                <input 
                  v-model="name"
                  id="contact-name"
                  required
                  type="text" 
                  placeholder="e.g. Nusrat Jahan"
                  class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="contact-phone">
                  Phone Number (WhatsApp) *
                </label>
                <input 
                  v-model="phone"
                  id="contact-phone"
                  required
                  type="tel" 
                  placeholder="01XXXXXXXXX"
                  class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="contact-email">
                  Email Address (Optional)
                </label>
                <input 
                  v-model="email"
                  id="contact-email"
                  type="email" 
                  placeholder="you@domain.com"
                  class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="contact-subject">
                  Inquiry Topic *
                </label>
                <select 
                  v-model="subject"
                  id="contact-subject"
                  class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none cursor-pointer transition"
                >
                  <option value="Bespoke Tailoring & Measurements">Bespoke Tailoring &amp; Measurements</option>
                  <option value="Order Tracking & Status">Order Tracking &amp; Delivery Status</option>
                  <option value="Bridal Appointment Booking">Bridal Consultation Booking</option>
                  <option value="Wholesale / International Export">Wholesale &amp; Overseas Shipping</option>
                  <option value="General Inquiry">General Atelier Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="contact-message">
                Message / Custom Requirements *
              </label>
              <textarea 
                v-model="message"
                id="contact-message"
                required
                rows="5"
                placeholder="Kindly share specifics regarding fabric preference, colors, event date, or custom blouse stitching measurements..."
                class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal placeholder:text-text-muted focus:border-primary focus:bg-white focus:outline-none transition"
              ></textarea>
            </div>

            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span class="text-[11px] text-text-muted text-center sm:text-left">
                🔒 Your contact info is strictly confidential.
              </span>
              <button 
                type="submit"
                class="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-crimson-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        <!-- RIGHT: Atelier Contact Cards & Hours -->
        <aside class="lg:col-span-5 space-y-6">
          <!-- Quick Channels Card -->
          <div class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs space-y-5">
            <h3 class="font-serif font-bold text-lg text-text-charcoal pb-3 border-b border-border-hairline">
              Atelier Information
            </h3>

            <!-- Address -->
            <div class="flex items-start gap-3.5 text-xs">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[20px]">apartment</span>
              </div>
              <div>
                <span class="font-bold text-text-charcoal uppercase tracking-wider block mb-0.5">Flagship Studio</span>
                <p class="text-text-muted leading-relaxed">
                  House 42, Road 11, Block D, Banani,<br />
                  Dhaka - 1213, Bangladesh
                </p>
              </div>
            </div>

            <!-- WhatsApp & Phone -->
            <div class="flex items-start gap-3.5 text-xs">
              <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[20px]">phone_in_talk</span>
              </div>
              <div>
                <span class="font-bold text-text-charcoal uppercase tracking-wider block mb-0.5">Helpline &amp; WhatsApp</span>
                <a href="tel:+8801302694680" class="text-text-charcoal font-semibold hover:text-primary block">
                  +880 1302-694680
                </a>
                <span class="text-[11px] text-text-muted">Instant stylist chat available 24/7</span>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-3.5 text-xs">
              <div class="w-10 h-10 rounded-full bg-slate-100 text-text-charcoal flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[20px]">mark_email_read</span>
              </div>
              <div>
                <span class="font-bold text-text-charcoal uppercase tracking-wider block mb-0.5">Official Inquiries</span>
                <a href="mailto:care@artsofshop.com" class="text-primary hover:underline block font-semibold">
                  care@artsofshop.com
                </a>
                <span class="text-[11px] text-text-muted">Response within 24 hours</span>
              </div>
            </div>

            <!-- Studio Hours -->
            <div class="flex items-start gap-3.5 text-xs pt-1 border-t border-border-subtle">
              <div class="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div>
                <span class="font-bold text-text-charcoal uppercase tracking-wider block mb-0.5">Atelier Hours</span>
                <p class="text-text-charcoal font-medium">Saturday – Friday: 10:00 AM – 9:00 PM</p>
                <span class="text-[11px] text-text-muted">Open 7 days a week, including public holidays</span>
              </div>
            </div>
          </div>

          <!-- WhatsApp Quick Action Callout -->
          <div class="bg-[#1b3429] text-white rounded-2xl p-6 shadow-md relative overflow-hidden space-y-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
              INSTANT STYLIST CONNECT
            </span>
            <h4 class="font-serif font-bold text-xl text-white">Need Quick Saree or Panjabi Guidance?</h4>
            <p class="text-xs text-gray-300 font-light leading-relaxed">
              Our fashion consultant can send you live HD videos of saree borders and fabric swatches directly via WhatsApp.
            </p>
            <a 
              href="https://wa.me/8801302694680?text=Hello%20Arts%20of%20Shop%20I%20want%20to%20consult%20with%20a%20stylist" 
              target="_blank"
              class="w-full py-3 bg-whatsapp-green hover:brightness-105 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
            >
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat with Stylist Now</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>
