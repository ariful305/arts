<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const {
  items,
  shippingDestination,
  shippingCost,
  discount,
  isCouponApplied,
  itemsSubtotal,
  grandTotal,
  itemCount,
  clearCart
} = useCart()

// Form reactive fields
const fullName = ref('')
const phone = ref('')
const email = ref('')
const city = ref('Dhaka')
const street = ref('')
const apartment = ref('')
const slotDate = ref(new Date().toISOString().split('T')[0])
const slotTime = ref('afternoon')
const tailorNotes = ref('')
const paymentMethod = ref('cod')
const isOrderPlaced = ref(false)
const orderId = ref('')

// Quick tags
const quickTags = [
  'Urgent Festive Delivery',
  'Complimentary Gift Wrap',
  'Call Before Delivery',
  'Custom Blouse Stitching',
  'Gold Script Calligraphy Note'
]

function appendTag(tagText) {
  if (!tailorNotes.value.includes(tagText.trim())) {
    tailorNotes.value = (tailorNotes.value.trim() ? tailorNotes.value.trim() + ', ' : '') + tagText
  }
}

function handlePlaceOrder() {
  if (!fullName.value.trim() || !phone.value.trim() || !street.value.trim()) {
    alert('Please fill in your Full Name, Phone Number, and Street Address.')
    return
  }
  orderId.value = 'AOS-' + Math.floor(100000 + Math.random() * 900000)
  isOrderPlaced.value = true
}

function buyViaWhatsApp() {
  const phoneNum = '8801302694680'
  const itemsText = items.value.map(i => `${i.name} (x${i.quantity})`).join(', ')
  const total = `৳ ${grandTotal.value.toLocaleString('en-US')}.00`
  const dest = shippingDestination.value === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'
  const msg = encodeURIComponent(`Hello Arts of Shop, I want to confirm order:\n• Name: ${fullName.value || 'Valued Customer'}\n• Phone: ${phone.value || 'N/A'}\n• Address: ${street.value || ''}, ${city.value}\n• Items: ${itemsText}\n• Shipping: ${dest}\n• Total: ${total}`)
  window.open(`https://wa.me/${phoneNum}?text=${msg}`, '_blank')
}
</script>

<template>
  <main class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 pt-6 pb-16">
    <!-- Progress Stepper (Step 2: Checkout) -->
    <div class="mb-8 max-w-2xl mx-auto">
      <div class="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider">
        <router-link to="/cart" class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
          <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
          <span>Shopping Bag</span>
        </router-link>
        <div class="flex-1 h-0.5 bg-primary mx-3 sm:mx-6"></div>
        <div class="flex items-center gap-2 text-primary">
          <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
          <span>Checkout</span>
        </div>
        <div class="flex-1 h-0.5 bg-border-hairline mx-3 sm:mx-6"></div>
        <div class="flex items-center gap-2 text-text-muted">
          <span class="w-6 h-6 rounded-full bg-gray-200 text-text-muted flex items-center justify-center text-xs">3</span>
          <span>Order Complete</span>
        </div>
      </div>
    </div>

    <!-- Order Placed Success View -->
    <div v-if="isOrderPlaced" class="max-w-2xl mx-auto bg-surface-card rounded-2xl border border-border-hairline p-8 shadow-lg text-center space-y-5 my-8">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-[36px]">check_circle</span>
      </div>
      <h2 class="font-serif font-bold text-2xl sm:text-3xl text-text-charcoal">Order Successfully Placed!</h2>
      <p class="text-sm text-text-muted">
        Thank you, <strong>{{ fullName }}</strong>! Your artisanal order <strong>#{{ orderId }}</strong> has been received by our Banani Atelier team.
      </p>
      <div class="bg-slate-50 p-4 rounded-xl border border-border-hairline text-left text-xs space-y-2 max-w-md mx-auto">
        <div class="flex justify-between">
          <span class="text-text-muted">Delivery To:</span>
          <span class="font-bold text-text-charcoal">{{ street }}, {{ city }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-muted">Contact:</span>
          <span class="font-bold text-text-charcoal">{{ phone }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-muted">Payment Method:</span>
          <span class="font-bold text-text-charcoal uppercase">{{ paymentMethod }}</span>
        </div>
        <div class="flex justify-between pt-2 border-t font-bold text-sm">
          <span>Amount Payable:</span>
          <span class="text-primary">৳ {{ grandTotal.toLocaleString('en-US') }}.00</span>
        </div>
      </div>
      <div class="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <router-link to="/" class="bg-primary hover:bg-crimson-hover text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition">
          Return to Home
        </router-link>
        <button 
          type="button" 
          @click="buyViaWhatsApp" 
          class="bg-whatsapp-green hover:brightness-105 text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">chat</span>
          <span>Notify via WhatsApp</span>
        </button>
      </div>
    </div>

    <!-- Main Checkout Form Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- LEFT COLUMN: Billing & Shipping Details Form -->
      <section class="lg:col-span-7 space-y-6">
        <!-- Address & Customer Details -->
        <form id="checkout-form" @submit.prevent="handlePlaceOrder" class="bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-7 shadow-xs space-y-6">
          <h2 class="font-serif font-bold text-lg sm:text-xl text-text-charcoal flex items-center gap-2 pb-3 border-b border-border-hairline">
            <span class="material-symbols-outlined text-primary text-[22px]">local_shipping</span>
            <span>Delivery &amp; Customer Information</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="full_name">
                Full Name *
              </label>
              <input 
                v-model="fullName"
                id="full_name" 
                required 
                class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition" 
                placeholder="e.g. Nusrat Jahan / Tanvir Ahmed" 
                type="text"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="phone">
                Phone Number (WhatsApp Active) *
              </label>
              <input 
                v-model="phone"
                id="phone" 
                required 
                class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition" 
                placeholder="01XXXXXXXXX" 
                type="tel"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="email">
                Email Address (Optional)
              </label>
              <input 
                v-model="email"
                id="email" 
                class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition" 
                placeholder="you@domain.com" 
                type="email"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="city">
                District / Division *
              </label>
              <select 
                v-model="city"
                id="city" 
                class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none cursor-pointer transition"
              >
                <option value="Dhaka">Dhaka City</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-1.5" for="street">
              Detailed Street Address *
            </label>
            <input 
              v-model="street"
              id="street" 
              required 
              class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal focus:border-primary focus:bg-white focus:outline-none transition" 
              placeholder="House #, Road #, Area, Landmark" 
              type="text"
            />
          </div>

          <!-- Delivery Time Slot Selection -->
          <div class="pt-2">
            <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider mb-2">
              Preferred Delivery Time Window
            </label>
            <div class="grid grid-cols-3 gap-3 text-xs">
              <label 
                class="border rounded-lg p-3 text-center cursor-pointer transition select-none"
                :class="slotTime === 'morning' ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs' : 'border-border-hairline hover:border-gray-300 bg-white'"
              >
                <input type="radio" value="morning" v-model="slotTime" class="hidden" />
                <span class="block font-semibold">Morning</span>
                <span class="text-[10px] text-text-muted">10 AM – 1 PM</span>
              </label>
              <label 
                class="border rounded-lg p-3 text-center cursor-pointer transition select-none"
                :class="slotTime === 'afternoon' ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs' : 'border-border-hairline hover:border-gray-300 bg-white'"
              >
                <input type="radio" value="afternoon" v-model="slotTime" class="hidden" />
                <span class="block font-semibold">Afternoon</span>
                <span class="text-[10px] text-text-muted">2 PM – 5 PM</span>
              </label>
              <label 
                class="border rounded-lg p-3 text-center cursor-pointer transition select-none"
                :class="slotTime === 'evening' ? 'border-primary bg-primary/5 text-primary font-bold shadow-xs' : 'border-border-hairline hover:border-gray-300 bg-white'"
              >
                <input type="radio" value="evening" v-model="slotTime" class="hidden" />
                <span class="block font-semibold">Evening</span>
                <span class="text-[10px] text-text-muted">6 PM – 9 PM</span>
              </label>
            </div>
          </div>

          <!-- Custom Tailoring Notes & Quick Chips -->
          <div class="pt-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider" for="tailor-notes">
                Special Instructions &amp; Custom Tailoring
              </label>
              <span class="text-[11px] text-text-muted">Click chips to append:</span>
            </div>
            <div class="flex flex-wrap gap-1.5 mb-2.5">
              <button 
                v-for="tag in quickTags" 
                :key="tag"
                type="button"
                @click="appendTag(tag)"
                class="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary/10 hover:text-primary text-text-charcoal font-medium border border-slate-200 transition cursor-pointer"
              >
                + {{ tag }}
              </button>
            </div>
            <textarea 
              v-model="tailorNotes"
              id="tailor-notes" 
              class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal placeholder:text-text-muted focus:border-primary focus:bg-white focus:outline-none transition" 
              placeholder="e.g. Please custom stitch blouse to 36 inch chest, deliver before Thursday evening..." 
              rows="3"
            ></textarea>
          </div>
        </form>
      </section>

      <!-- RIGHT COLUMN: Order Summary & Payment Method Sidebar -->
      <aside class="lg:col-span-5 sticky top-28">
        <div class="bg-surface-card rounded-2xl border border-border-hairline shadow-md p-5 sm:p-6 relative space-y-5">
          <!-- Card Title & Header -->
          <div class="flex items-center justify-between pb-3.5 border-b border-border-hairline">
            <h2 class="font-serif font-bold text-lg sm:text-xl text-text-charcoal flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
              <span>Order Summary</span>
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold text-text-muted bg-gray-100 px-2.5 py-0.5 rounded-full">
                {{ itemCount }} Item{{ itemCount !== 1 ? 's' : '' }}
              </span>
              <router-link to="/cart" class="text-[11px] font-semibold text-primary hover:underline">
                Edit Bag
              </router-link>
            </div>
          </div>

          <!-- Product Details Section -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-bold uppercase tracking-wider text-text-charcoal flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[17px] text-primary">inventory_2</span>
                Product Details
              </span>
            </div>

            <!-- Items List with full specs and thumbnail -->
            <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
              <div 
                v-for="item in items" 
                :key="item.id" 
                class="flex gap-3 bg-slate-50/80 p-3 rounded-xl border border-border-hairline text-xs"
              >
                <!-- Thumbnail -->
                <img 
                  :alt="item.name" 
                  class="w-16 h-20 object-cover rounded-lg border border-border-hairline shrink-0 shadow-xs" 
                  :src="item.image" 
                />

                <!-- Info & Specs -->
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-text-charcoal text-xs sm:text-sm leading-snug line-clamp-2">{{ item.name }}</h4>
                    <div class="mt-1 flex flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] text-text-muted">
                      <span v-if="item.fabric"><strong class="text-text-charcoal font-medium">Fabric:</strong> {{ item.fabric }}</span>
                      <span v-if="item.color"><strong class="text-text-charcoal font-medium">Color:</strong> {{ item.color }}</span>
                      <span v-if="item.designColor"><strong class="text-text-charcoal font-medium">Design:</strong> {{ item.designColor }}</span>
                      <span v-if="item.size"><strong class="text-text-charcoal font-medium">Size:</strong> {{ item.size }}</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-border-subtle mt-1.5">
                    <span class="text-text-muted font-medium">
                      Qty: <span class="font-bold text-text-charcoal">{{ item.quantity }}</span> × ৳ {{ item.price.toLocaleString('en-US') }}
                    </span>
                    <span class="font-bold text-primary text-xs sm:text-sm">
                      ৳ {{ (item.price * item.quantity).toLocaleString('en-US') }}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cost Breakdown -->
          <div class="pt-3 border-t border-border-hairline space-y-3 text-xs sm:text-sm">
            <div class="flex justify-between items-center text-text-muted">
              <span>Items Subtotal</span>
              <span class="font-semibold text-text-charcoal">৳ {{ itemsSubtotal.toLocaleString('en-US') }}.00</span>
            </div>
            <div v-if="isCouponApplied" class="flex justify-between items-center text-primary">
              <span>Coupon Discount (10%)</span>
              <span class="font-bold">- ৳ {{ discount.toLocaleString('en-US') }}.00</span>
            </div>

            <!-- Shipping Destination Selector -->
            <div>
              <span class="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Shipping Destination:</span>
              <div class="space-y-2 bg-[#fdf8f8] p-3 rounded-lg border border-border-subtle">
                <label class="flex items-center justify-between text-xs cursor-pointer select-none">
                  <div class="flex items-center gap-2">
                    <input 
                      type="radio" 
                      value="inside" 
                      v-model="shippingDestination"
                      class="text-primary focus:ring-primary accent-primary cursor-pointer" 
                    />
                    <span class="font-medium text-text-charcoal">Inside Dhaka (Express 24H)</span>
                  </div>
                  <span class="font-bold text-text-charcoal">৳ 70.00</span>
                </label>
                <label class="flex items-center justify-between text-xs cursor-pointer select-none">
                  <div class="flex items-center gap-2">
                    <input 
                      type="radio" 
                      value="outside" 
                      v-model="shippingDestination"
                      class="text-primary focus:ring-primary accent-primary cursor-pointer" 
                    />
                    <span class="text-text-muted">Outside Dhaka (All BD 48H)</span>
                  </div>
                  <span class="font-medium text-text-muted">৳ 150.00</span>
                </label>
              </div>
            </div>

            <div class="flex justify-between items-center text-xs text-text-muted pt-1">
              <span>VAT &amp; Taxes</span>
              <span class="text-[#0f8a48] font-semibold">Included</span>
            </div>
          </div>

          <!-- Grand Total -->
          <div class="pt-3 border-t border-border-hairline flex justify-between items-baseline">
            <div>
              <span class="font-serif font-bold text-base text-text-charcoal block">Grand Total</span>
              <span class="text-[11px] text-[#0f8a48] font-medium">Cash on Delivery Available</span>
            </div>
            <div class="text-right">
              <span id="grand-total-display" class="font-serif text-2xl sm:text-3xl font-bold text-primary">
                ৳ {{ grandTotal.toLocaleString('en-US') }}.00
              </span>
            </div>
          </div>

          <!-- Select Payment Method in Right Sidebar -->
          <div class="pt-3 border-t border-border-hairline space-y-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-text-charcoal flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[17px] text-primary">payments</span>
              Select Payment Method *
            </span>

            <div class="space-y-2">
              <!-- Cash on Delivery -->
              <label 
                class="flex items-start justify-between p-3 rounded-xl border cursor-pointer transition select-none"
                :class="paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border-hairline hover:bg-slate-50'"
              >
                <div class="flex items-start gap-2.5">
                  <input type="radio" value="cod" v-model="paymentMethod" class="mt-0.5 accent-primary cursor-pointer" />
                  <div>
                    <span class="font-bold text-xs text-text-charcoal block leading-tight">Cash on Delivery (COD)</span>
                    <span class="text-[10px] text-text-muted">Pay in cash or bKash upon courier delivery</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0">local_shipping</span>
              </label>

              <!-- bKash / Nagad -->
              <label 
                class="flex items-start justify-between p-3 rounded-xl border cursor-pointer transition select-none"
                :class="paymentMethod === 'bkash' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border-hairline hover:bg-slate-50'"
              >
                <div class="flex items-start gap-2.5">
                  <input type="radio" value="bkash" v-model="paymentMethod" class="mt-0.5 accent-primary cursor-pointer" />
                  <div>
                    <span class="font-bold text-xs text-text-charcoal block leading-tight">bKash / Nagad Direct</span>
                    <span class="text-[10px] text-text-muted">Instant verified payment via mobile banking</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0">account_balance_wallet</span>
              </label>

              <!-- Credit or Debit Card -->
              <label 
                class="flex items-start justify-between p-3 rounded-xl border cursor-pointer transition select-none"
                :class="paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border-hairline hover:bg-slate-50'"
              >
                <div class="flex items-start gap-2.5">
                  <input type="radio" value="card" v-model="paymentMethod" class="mt-0.5 accent-primary cursor-pointer" />
                  <div>
                    <span class="font-bold text-xs text-text-charcoal block leading-tight">Credit or Debit Card</span>
                    <span class="text-[10px] text-text-muted">Visa, Mastercard, AMEX with 3D-Secure</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-primary text-[20px] shrink-0">credit_card</span>
              </label>
            </div>
          </div>

          <!-- Submit Action Buttons -->
          <div class="pt-2 space-y-2.5">
            <button 
              type="submit"
              form="checkout-form"
              class="w-full bg-primary hover:bg-crimson-hover text-white py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>PLACE ORDER ৳ {{ grandTotal.toLocaleString('en-US') }}.00</span>
              <span class="material-symbols-outlined text-[18px]">verified</span>
            </button>
            <button 
              type="button" 
              @click="buyViaWhatsApp" 
              class="w-full bg-whatsapp-green hover:brightness-105 text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 text-center cursor-pointer active:scale-[0.99]"
            >
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>Confirm Order on WhatsApp</span>
            </button>
          </div>

          <!-- Trust Guarantees -->
          <div class="pt-3 border-t border-border-hairline space-y-2 text-xs text-text-muted">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[17px]">verified_user</span>
              <span>100% Authentic Handcrafted Quality</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[17px]">lock</span>
              <span>Encrypted Secure Checkout</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[17px]">support_agent</span>
              <span>Banani Helpline: <a href="tel:+8801302694680" class="font-bold underline text-text-charcoal">+880 1302-694680</a></span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
