<script setup>
</script>

<template>
  <footer class="w-full bg-[#0b1118] border-t border-[#1e293b] text-white mt-auto">
    <div class="max-w-[1440px] mx-auto px-4 lg:px-8 py-10">
      <!-- 4-Feature Banner -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-[#1e293b]">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-full bg-[#ba1a2e]/10 border border-[#ba1a2e]/20 flex items-center justify-center shrink-0 text-[#ba1a2e]">
            <span class="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div>
            <h4 class="text-[13px] font-bold uppercase tracking-wider text-white">FAST PROCESSING</h4>
            <p class="text-[12px] text-gray-400 mt-0.5">Orders processed quickly</p>
          </div>
        </div>
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-full bg-[#ba1a2e]/10 border border-[#ba1a2e]/20 flex items-center justify-center shrink-0 text-[#ba1a2e]">
            <span class="material-symbols-outlined text-[24px]">headset_mic</span>
          </div>
          <div>
            <h4 class="text-[13px] font-bold uppercase tracking-wider text-white">CUSTOMER SUPPORT</h4>
            <p class="text-[12px] text-gray-400 mt-0.5">Help available anytime you need</p>
          </div>
        </div>
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-full bg-[#ba1a2e]/10 border border-[#ba1a2e]/20 flex items-center justify-center shrink-0 text-[#ba1a2e]">
            <span class="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h4 class="text-[13px] font-bold uppercase tracking-wider text-white">SECURE PAYMENT</h4>
            <p class="text-[12px] text-gray-400 mt-0.5">Safe and trusted payments</p>
          </div>
        </div>
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-full bg-[#ba1a2e]/10 border border-[#ba1a2e]/20 flex items-center justify-center shrink-0 text-[#ba1a2e]">
            <span class="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
          <div>
            <h4 class="text-[13px] font-bold uppercase tracking-wider text-white">QUALITY PRODUCTS</h4>
            <p class="text-[12px] text-gray-400 mt-0.5">Carefully selected premium clothing</p>
          </div>
        </div>
      </div>

      <!-- Links & Brand Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10 border-b border-[#1e293b]">
        <!-- Brand Description -->
        <div class="lg:col-span-4 space-y-4">
          <router-link to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#16202c] border border-[#2d3a4f] flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">
              A
            </div>
            <span class="font-serif text-[22px] font-bold tracking-tight text-white">ARTS OF SHOP</span>
          </router-link>
          <p class="text-[13px] leading-relaxed text-gray-400 pr-4">
            Arts of Shop is an online clothing store that offers stylish and affordable fashion for customers. It provides an easy shopping experience with product browsing, secure ordering, and smooth checkout.
          </p>
          <div class="flex items-center gap-2.5 pt-1">
            <a class="w-9 h-9 rounded-full bg-[#16202c] border border-[#2d3a4f] hover:border-[#ba1a2e] hover:text-[#ba1a2e] text-gray-300 flex items-center justify-center transition-colors" href="#" aria-label="Facebook">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </a>
            <a class="w-9 h-9 rounded-full bg-[#16202c] border border-[#2d3a4f] hover:border-[#ba1a2e] hover:text-[#ba1a2e] text-gray-300 flex items-center justify-center transition-colors" href="#" aria-label="YouTube">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
              </svg>
            </a>
            <a class="w-9 h-9 rounded-full bg-[#16202c] border border-[#2d3a4f] hover:border-[#25D366] hover:text-[#25D366] text-gray-300 flex items-center justify-center transition-colors" href="https://wa.me/8801302694680" rel="noopener noreferrer" target="_blank" aria-label="WhatsApp">
              <span class="material-symbols-outlined text-[18px]">chat</span>
            </a>
          </div>
        </div>

        <!-- Useful Links -->
        <div class="lg:col-span-2 space-y-3.5">
          <h4 class="text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#1e293b] pb-2">USEFUL LINKS</h4>
          <ul class="space-y-2 text-[13px] text-gray-400">
            <li class="hover:text-white transition-colors"><router-link to="/">Home</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Shop Collections</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/reviews">Customer Reviews</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/faq">FAQs &amp; Help</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/contact">Contact Atelier</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/account">My Account &amp; Orders</router-link></li>
          </ul>
        </div>

        <!-- Women Categories -->
        <div class="lg:col-span-3 space-y-3.5">
          <h4 class="text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#1e293b] pb-2">WOMEN CATEGORIES</h4>
          <ul class="space-y-2 text-[13px] text-gray-400">
            <li class="hover:text-white transition-colors"><router-link to="/category">Floral saree</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">lahenga</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Hijab</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Floral Three Piece</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Grown</router-link></li>
          </ul>
        </div>

        <!-- Others Categories -->
        <div class="lg:col-span-3 space-y-3.5">
          <h4 class="text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#1e293b] pb-2">OTHERS CATEGORIES</h4>
          <ul class="space-y-2 text-[13px] text-gray-400">
            <li class="hover:text-white transition-colors"><router-link to="/category">punjabi</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Jewellary</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Bag / Tote</router-link></li>
            <li class="hover:text-white transition-colors"><router-link to="/category">Kids</router-link></li>
            <li class="hover:text-white transition-colors"><a href="#">Privacy Policy</a></li>
            <li class="hover:text-white transition-colors"><a href="#">Terms &amp; Conditions</a></li>
            <li class="hover:text-white transition-colors"><a href="#">Our Sitemap</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-400">
        <div class="text-center sm:text-left">© 2026 Arts of Shop. All Rights Reserved.</div>
        <div class="text-center sm:text-right font-medium text-gray-400">
          Nationwide Cash on Delivery (COD) Available • Verified Authentic
        </div>
      </div>
    </div>
  </footer>
</template>
