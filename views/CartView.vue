<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const {
  items,
  shippingDestination,
  shippingCost,
  couponCode,
  discount,
  isCouponApplied,
  itemsSubtotal,
  grandTotal,
  itemCount,
  updateQuantity,
  removeItem,
  applyCoupon,
  clearCart
} = useCart()

const inputCoupon = ref('EID10')
const giftNote = ref('')
const freeShippingThreshold = 5000

const remainingForFreeShipping = computed(() => {
  return Math.max(0, freeShippingThreshold - itemsSubtotal.value)
})

const freeShippingProgress = computed(() => {
  return Math.min(100, Math.round((itemsSubtotal.value / freeShippingThreshold) * 100))
})

function handleApplyCoupon() {
  applyCoupon(inputCoupon.value)
}

function buyViaWhatsApp() {
  const phone = '8801302694680'
  const itemsSummary = items.value.map(i => `${i.name} (x${i.quantity})`).join(', ')
  const total = `৳ ${grandTotal.value.toLocaleString('en-US')}.00`
  const msg = encodeURIComponent(`Hello Arts of Shop, I want to order my shopping bag: ${itemsSummary}. Total: ${total}. Link: ${window.location.origin}/cart`)
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
}
</script>

<template>
  <main class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 pt-6 pb-16">
    <!-- Progress Stepper (Step 1: Shopping Bag) -->
    <div class="mb-8 max-w-2xl mx-auto">
      <div class="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider">
        <div class="flex items-center gap-2 text-primary">
          <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
          <span>Shopping Bag</span>
        </div>
        <div class="flex-1 h-0.5 bg-border-hairline mx-3 sm:mx-6"></div>
        <router-link to="/checkout" class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
          <span class="w-6 h-6 rounded-full bg-gray-200 text-text-muted flex items-center justify-center text-xs">2</span>
          <span>Checkout</span>
        </router-link>
        <div class="flex-1 h-0.5 bg-border-hairline mx-3 sm:mx-6"></div>
        <div class="flex items-center gap-2 text-text-muted">
          <span class="w-6 h-6 rounded-full bg-gray-200 text-text-muted flex items-center justify-center text-xs">3</span>
          <span>Order Complete</span>
        </div>
      </div>
    </div>

    <!-- Free Shipping Progress Bar -->
    <div class="bg-surface-card rounded-xl p-4 border border-border-hairline mb-8 shadow-xs">
      <div class="flex items-center justify-between text-xs mb-2">
        <div class="flex items-center gap-1.5 font-bold text-text-charcoal">
          <span class="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
          <span v-if="remainingForFreeShipping > 0">
            Add <strong>৳ {{ remainingForFreeShipping.toLocaleString('en-US') }}</strong> more for <strong>FREE express shipping!</strong>
          </span>
          <span v-else class="text-[#0f8a48]">
            🎉 You have qualified for <strong>FREE EXPRESS SHIPPING!</strong>
          </span>
        </div>
        <span class="text-text-muted font-medium">Free at ৳5,000</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-500" 
          :style="{ width: freeShippingProgress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Main Two-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- LEFT COLUMN: Cart Items Table -->
      <section class="lg:col-span-8 space-y-6">
        <div class="bg-surface-card rounded-2xl border border-border-hairline shadow-xs overflow-hidden">
          <!-- Table Header -->
          <div class="hidden sm:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-border-hairline text-xs font-bold uppercase tracking-wider text-text-muted">
            <div class="col-span-6">Item Description</div>
            <div class="col-span-2 text-center">Unit Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Subtotal</div>
          </div>

          <!-- Items List -->
          <div v-if="items.length > 0" class="divide-y divide-border-hairline">
            <div 
              v-for="item in items" 
              :key="item.id"
              class="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
            >
              <!-- Product Image & Details -->
              <div class="w-full sm:col-span-6 flex items-center gap-4">
                <router-link to="/single" class="w-20 h-26 rounded-lg overflow-hidden shrink-0 border border-border-hairline bg-slate-50">
                  <img :alt="item.name" class="w-full h-full object-cover" :src="item.image" />
                </router-link>
                <div class="space-y-1">
                  <router-link to="/single" class="font-serif font-bold text-sm text-text-charcoal hover:text-primary transition-colors block">
                    {{ item.name }}
                  </router-link>
                  <p class="text-xs text-text-muted font-medium">SKU: {{ item.sku }}</p>
                  <div class="flex flex-wrap gap-2 text-[11px] text-text-muted pt-1">
                    <span class="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Fabric: {{ item.fabric }}</span>
                    <span class="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Color: {{ item.color }}</span>
                    <span class="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Size: {{ item.size }}</span>
                  </div>
                </div>
              </div>

              <!-- Unit Price -->
              <div class="w-full sm:col-span-2 flex sm:justify-center items-center justify-between text-xs sm:text-sm font-semibold text-text-charcoal">
                <span class="sm:hidden text-text-muted font-normal">Unit Price:</span>
                <span>৳ {{ item.price.toLocaleString('en-US') }}.00</span>
              </div>

              <!-- Quantity Controls -->
              <div class="w-full sm:col-span-2 flex sm:justify-center items-center justify-between">
                <span class="sm:hidden text-text-muted font-normal text-xs">Quantity:</span>
                <div class="flex items-center border border-border-hairline rounded-lg overflow-hidden bg-white shadow-xs">
                  <button 
                    type="button"
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 flex items-center justify-center text-text-charcoal hover:bg-slate-100 cursor-pointer" 
                    aria-label="Decrease quantity"
                  >
                    <span class="material-symbols-outlined text-[14px]">remove</span>
                  </button>
                  <span class="w-8 text-center text-xs font-bold">{{ item.quantity }}</span>
                  <button 
                    type="button"
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 flex items-center justify-center text-text-charcoal hover:bg-slate-100 cursor-pointer" 
                    aria-label="Increase quantity"
                  >
                    <span class="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>

              <!-- Subtotal & Remove -->
              <div class="w-full sm:col-span-2 flex sm:justify-end items-center justify-between">
                <span class="sm:hidden text-text-muted font-normal text-xs">Total:</span>
                <div class="flex items-center gap-3">
                  <span class="font-bold text-primary text-xs sm:text-sm">
                    ৳ {{ (item.price * item.quantity).toLocaleString('en-US') }}.00
                  </span>
                  <button 
                    type="button"
                    @click="removeItem(item.id)"
                    class="text-gray-400 hover:text-primary transition-colors cursor-pointer" 
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-else class="p-12 text-center space-y-4">
            <span class="material-symbols-outlined text-6xl text-gray-300">shopping_bag</span>
            <h3 class="font-serif font-bold text-xl text-text-charcoal">Your Shopping Bag is Empty</h3>
            <p class="text-xs text-text-muted max-w-sm mx-auto">
              Explore our exquisite collection of festive sarees, bridal lehengas, and designer panjabis.
            </p>
            <router-link 
              to="/category" 
              class="inline-flex items-center gap-2 bg-primary hover:bg-crimson-hover text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Explore Collection</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </router-link>
          </div>

          <!-- Cart Bottom Controls & Actions -->
          <div class="p-4 sm:p-5 bg-slate-50 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Coupon Code Form -->
            <form @submit.prevent="handleApplyCoupon" class="w-full sm:w-auto flex items-center gap-2">
              <input 
                v-model="inputCoupon"
                class="px-3.5 py-2 text-xs bg-white border border-border-hairline rounded-lg focus:outline-none focus:border-primary uppercase tracking-wider font-semibold w-40" 
                placeholder="Coupon Code" 
                type="text"
              />
              <button 
                type="submit" 
                class="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Apply
              </button>
            </form>

            <!-- Buttons -->
            <div class="w-full sm:w-auto flex items-center justify-end gap-3">
              <router-link 
                to="/category" 
                class="text-xs font-bold text-text-charcoal hover:text-primary transition uppercase tracking-wider"
              >
                Continue Shopping
              </router-link>
              <button 
                type="button"
                @click="clearCart"
                class="text-xs font-bold text-red-600 hover:text-red-700 transition uppercase tracking-wider cursor-pointer"
                v-if="items.length > 0"
              >
                Clear Bag
              </button>
            </div>
          </div>
        </div>

        <!-- Gift Note & Packaging Accordion -->
        <details class="bg-surface-card rounded-xl border border-border-hairline p-5 shadow-xs group">
          <summary class="font-serif font-bold text-sm text-text-charcoal flex items-center justify-between cursor-pointer list-none select-none">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">featured_seasonal_and_gifts</span>
              <span>Complimentary Gift Packaging &amp; Handwritten Blessing Note</span>
            </span>
            <span class="material-symbols-outlined text-[18px] text-text-muted group-open:rotate-180 transition-transform">
              expand_more
            </span>
          </summary>
          <div class="pt-4 space-y-3">
            <p class="text-xs text-text-muted">
              Add our royal silk-ribbon packaging and a gold-scripted blessing note for the bride or groom at no extra charge:
            </p>
            <textarea 
              v-model="giftNote"
              class="w-full text-xs sm:text-sm bg-slate-50 border border-border-hairline rounded-lg p-3 text-text-charcoal placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="Write your personal blessing or love note for the bride here. Our resident calligrapher will script it by hand in gold ink..." 
              rows="3"
            ></textarea>
          </div>
        </details>
      </section>

      <!-- RIGHT COLUMN: Order Summary Card -->
      <aside class="lg:col-span-4 sticky top-36">
        <div class="bg-surface-card rounded-2xl border border-border-hairline shadow-md p-6 relative">
          <!-- Card Title -->
          <div class="flex items-center justify-between pb-4 border-b border-border-hairline">
            <h2 class="font-serif font-bold text-lg sm:text-xl text-text-charcoal flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
              <span>Order Summary</span>
            </h2>
            <span class="text-[11px] font-bold text-text-muted bg-gray-100 px-2.5 py-0.5 rounded-full">
              {{ itemCount }} Item{{ itemCount !== 1 ? 's' : '' }}
            </span>
          </div>

          <!-- Cost Breakdown -->
          <div class="py-4 space-y-3.5 text-xs sm:text-sm border-b border-border-hairline">
            <div class="flex justify-between items-center text-text-muted">
              <span>Items Subtotal</span>
              <span class="font-semibold text-text-charcoal">৳ {{ itemsSubtotal.toLocaleString('en-US') }}.00</span>
            </div>
            <div v-if="isCouponApplied" class="flex justify-between items-center text-primary">
              <span>Coupon Discount (10%)</span>
              <span class="font-bold">- ৳ {{ discount.toLocaleString('en-US') }}.00</span>
            </div>

            <!-- Shipping Destination Selector -->
            <div class="pt-1">
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
          <div class="py-4 flex justify-between items-baseline border-b border-border-hairline">
            <div>
              <span class="font-serif font-bold text-base text-text-charcoal block">Grand Total</span>
              <span class="text-[11px] text-[#0f8a48] font-medium">Cash on Delivery Available</span>
            </div>
            <div class="text-right">
              <span class="font-serif text-2xl sm:text-3xl font-bold text-primary">
                ৳ {{ grandTotal.toLocaleString('en-US') }}.00
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-5 space-y-3">
            <router-link 
              to="/checkout" 
              class="w-full bg-primary hover:bg-crimson-hover text-white py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-center"
            >
              <span>Proceed to Checkout</span>
              <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </router-link>
            <button 
              type="button"
              @click="buyViaWhatsApp"
              class="w-full bg-whatsapp-green hover:brightness-105 text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span>Quick Order via WhatsApp</span>
            </button>
          </div>

          <!-- Trust Guarantees -->
          <div class="mt-6 pt-5 border-t border-border-hairline space-y-2 text-xs text-text-muted">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span>100% Authentic Handcrafted Quality</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">payments</span>
              <span>Nationwide Cash on Delivery (COD)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">support_agent</span>
              <span>Stylist Helpline: <a href="tel:+8801302694680" class="font-bold underline text-text-charcoal">+880 1302-694680</a></span>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="mt-4 pt-3 border-t border-border-hairline flex items-center justify-center gap-2 flex-wrap text-[11px] font-bold text-gray-500">
            <span class="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">bKash</span>
            <span class="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">Nagad</span>
            <span class="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">Rocket</span>
            <span class="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">Visa</span>
            <span class="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">Mastercard</span>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
