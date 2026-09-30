<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const { addItem } = useCart()

// Image Gallery
const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBd46PH30weqh4gAkKTewI63r7bU-AxXzBhs5Sl7j5ESL_r__ytRy_v-JrNhi-sXHzFvBn-UzJQkAIprV3J92UbwyMutwsziKkeLTfsI9EoDx2ENu_vtgzL-cP_A6t2dASd-ID0EfN9nwLnKW_cGfMUHFoV4eee5enKw0usHvPGokQFFo8RTrVI-l4LUEC274_2iE-Lnj0vt56nqC2vIUDTRMreS-bOiIfZd4ZHeFhasLqoBKsJlrRpVOaAqHkxX7PbZA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFH-Lkmxob4xRKTUuhInYOBw06G9iqU83S24XKpkwZfBKo2HZpsoZdaCHZmng8W9lJsxwyhiNbftVoixIc1uYd1J5MskQemFEuL4gj76ZZxWaB_nE_PEWq1tCdGSskf3gNI1XSq9NeOjvXHaOdaFlMpsF4pVA0PshpB7Pmjx6awj9TerMXZE85OXv2Ddgxmbbc-lVPVhm-Tqrxrw7kRBM1zRvY3rnQUIR6ITJn1AnwTi4d8To1cbYfyD_Rx7Drq9K2g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCUcjPKpA-3YPgxKQUL0GhEQjjPFcWhEis79hF-Oeghu3k5GQGRv6_4h147kaq5z-bc7kh3E9loJVyAdO45949n970rga600l1Y62odfSzxHy69GrZQEUjv1wdJfJSLaf3L35lv5d5SioG8qoAT9wM_jMDNOdBHBddv9nR55Gx3ryBHAl5c2BPzPKA2rBk6S2utN-Pd_UWx-_5wHTeQ8hQm_JovHIXA95AQX3pTyAI1dUd8WqbyjlGYq3w08SBDAhuspQ'
]
const selectedImage = ref(images[0])

// Variation 1: Fabrics
const fabrics = ['Aarong cotton', 'Georgette', 'Muslin', 'Semi Muslin', 'Soft Organza']
const selectedFabric = ref('Soft Organza')

// Variation 2: Saree Color Swatches
const sareeColors = [
  { name: 'Black', class: 'bg-black' },
  { name: 'Royal Blue', class: 'bg-blue-600' },
  { name: 'Warm Brown', class: 'bg-amber-800' },
  { name: 'Bright Yellow', class: 'bg-yellow-300' },
  { name: 'Sky Cyan', class: 'bg-cyan-400' },
  { name: 'Deep Blue', class: 'bg-blue-800' },
  { name: 'Silver Grey', class: 'bg-slate-300' },
  { name: 'Forest Green', class: 'bg-green-700' },
  { name: 'Deep Maroon', class: 'bg-red-900' },
  { name: 'Amber Orange', class: 'bg-amber-500' },
  { name: 'Blush Pink', class: 'bg-pink-400' },
  { name: 'Ruby Red', class: 'bg-red-600' },
  { name: 'Coral', class: 'bg-red-400' },
  { name: 'Soft Cyan', class: 'bg-sky-300' },
  { name: 'Pastel Peach', class: 'bg-[#fae8e0]' }
]
const selectedSareeColor = ref('Pastel Peach')

// Variation 3: Saree Design Color Swatches
const designColors = [
  { name: 'Black', class: 'bg-black' },
  { name: 'Sky Cyan', class: 'bg-sky-400' },
  { name: 'Warm Amber', class: 'bg-amber-700' },
  { name: 'Soft Cyan', class: 'bg-cyan-300' },
  { name: 'Stone Grey', class: 'bg-stone-300' },
  { name: 'Emerald Green', class: 'bg-emerald-600' },
  { name: 'Deep Maroon', class: 'bg-red-900' },
  { name: 'Amber Orange', class: 'bg-amber-500' },
  { name: 'Soft Pink', class: 'bg-pink-300' },
  { name: 'Royal Purple', class: 'bg-purple-700' },
  { name: 'Ruby Red', class: 'bg-red-600' },
  { name: 'Light Blue', class: 'bg-sky-300' },
  { name: 'Hand-painted White & Soft Petals', class: 'bg-white' },
  { name: 'Pale Yellow', class: 'bg-yellow-200' }
]
const selectedDesignColor = ref('Hand-painted White & Soft Petals')

// Quantity
const quantity = ref(1)

// Tabs: description | reviews
const activeTab = ref('description')

// Lightbox for customer review photo preview
const previewModalImage = ref('')

// Customer Reviews List with Real Customer Drape & Detail Photos
const reviews = [
  {
    author: 'Samira Rahman',
    location: 'Gulshan, Dhaka',
    rating: 5,
    date: '1 week ago',
    comment: 'The pastel peach shade and soft organza drape exceeded my expectations. Dainty pearl border adds pure royalty! Wearing it for an afternoon family dawat.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBC3kBV3OnJBgfwSgGPcpD7pyFoDe0C4-2w8NeRVI4fpSsTa5BTw_EW0uXD7UmVm4kKjPlA-p9pYuuZ6ZS6yOOoc5_Pmhv16wE6nkljYYZ65E-3Bahbcw8aaghJ5KeUEVYCktkrjzAuXewaQ2olnLgDhO3oWlDm8Ckg2xiEpFUDvX43RzZBtKYSZow9JWcASIYJOvuIf2XW-h7uP_I_-pvMB0exfEngJQcfvF-KkMTPSLql5bkhzZfqPr4aatxCJ-DSow'
    ]
  },
  {
    author: 'Fahmida Hossain',
    location: 'Chittagong',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Ordered for my engagement ceremony. The hand-painted white blossoms looked breathtaking in natural daylight photography. Everyone kept asking where I bought it from.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBd46PH30weqh4gAkKTewI63r7bU-AxXzBhs5Sl7j5ESL_r__ytRy_v-JrNhi-sXHzFvBn-UzJQkAIprV3J92UbwyMutwsziKkeLTfsI9EoDx2ENu_vtgzL-cP_A6t2dASd-ID0EfN9nwLnKW_cGfMUHFoV4eee5enKw0usHvPGokQFFo8RTrVI-l4LUEC274_2iE-Lnj0vt56nqC2vIUDTRMreS-bOiIfZd4ZHeFhasLqoBKsJlrRpVOaAqHkxX7PbZA'
    ]
  },
  {
    author: 'Nusrat Jahan',
    location: 'Dhanmondi, Dhaka',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Extremely lightweight and breathable. Wore it for 8 hours without any discomfort. Delivery in 24 hours was so fast.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFH-Lkmxob4xRKTUuhInYOBw06G9iqU83S24XKpkwZfBKo2HZpsoZdaCHZmng8W9lJsxwyhiNbftVoixIc1uYd1J5MskQemFEuL4gj76ZZxWaB_nE_PEWq1tCdGSskf3gNI1XSq9NeOjvXHaOdaFlMpsF4pVA0PshpB7Pmjx6awj9TerMXZE85OXv2Ddgxmbbc-lVPVhm-Tqrxrw7kRBM1zRvY3rnQUIR6ITJn1AnwTi4d8To1cbYfyD_Rx7Drq9K2g'
    ]
  },
  {
    author: 'Tasmia Karim',
    location: 'Sylhet',
    rating: 5,
    date: '1 month ago',
    comment: 'The craftsmanship is authentic artisanal quality. Truly an heirloom piece from Arts of Shop. The sheer texture and brush strokes are genuine hand-work.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAG3pXKRhP3txveodhBLUaDPAopW6gOLAtOf4dg8od68L2tWU6-HI6p1LZZvsjolRjQNHhASBysNk2NLXzRnXOert5UVY2mQXUOP-_2o8-VaQ4-J-CihGrN7sx5i2JZEypawuByEQv_0vbefJTcqRrZwABnmepPRG21b0F6_UvjdYeDREHEaCKJOODNwC0lAsX2dmeP1BtpsQodc8R2utVTm--8Z7ihXhRU3mOPAegSgRPmqipG-BsCcCtw4LX4kuDfpw'
    ]
  },
  {
    author: 'Rumana Parveen',
    location: 'Uttara, Dhaka',
    rating: 5,
    date: '1 month ago',
    comment: 'Fabric feels premium and falls elegantly. Packaging with gold calligraphy note was so thoughtful. Loved the personal touch.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKf7Pc4Gyer0Wo9M6_cEAMp3Lxvn6kpQdqtYNLt-NO-MXZ4hju6ZPbzCIUkOXxyMAiNYeIn5SlFTARRdxIZD7uE2y_LdXgEbisyE1qdqI-LeYjAoCDkgdPc9FMzT_x56npIJ-WPatkFtdS3lMEEk6Q-lXMeDlvK5wffA9W8zWRxth05flOFTIS680nbwRy5mWSa8gPKnGJ8JLw46PInDNN_C560t01hfG1HQCkCBKYwjAtrPcEr5vi'
    ]
  },
  {
    author: 'Ayesha Siddiqua',
    location: 'Rajshahi',
    rating: 5,
    date: '2 months ago',
    comment: 'Color match is 100% accurate to the pictures. Excellent customer service over WhatsApp as well. 10/10 recommend!',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVpUKswuUqTxtJ1BX4VWXrGjSMLfA0ITCV3AbhTkT5ayu2jDDMwYlv5wtUhPF8h1wKXdzIf37-wPw0DWm-dky6PPyNNHVRFKW6DtAWS3vy-6Zt34HPOdQ82Y_RV0YpotmehL1wM1CMmQZxNAZ1MrOrkkKejplEt8-mhJLvAeUXF0JX221f7DH1ZuZaEMKDcOwXHaIzPv2ciTChaiDliT7JZx4tROJBJcEvNUdISybZVOAC-bqfSh3e2RiFL01dtZxuWg'
    ]
  }
]

// All customer photos combined for gallery strip
const allCustomerPhotos = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBC3kBV3OnJBgfwSgGPcpD7pyFoDe0C4-2w8NeRVI4fpSsTa5BTw_EW0uXD7UmVm4kKjPlA-p9pYuuZ6ZS6yOOoc5_Pmhv16wE6nkljYYZ65E-3Bahbcw8aaghJ5KeUEVYCktkrjzAuXewaQ2olnLgDhO3oWlDm8Ckg2xiEpFUDvX43RzZBtKYSZow9JWcASIYJOvuIf2XW-h7uP_I_-pvMB0exfEngJQcfvF-KkMTPSLql5bkhzZfqPr4aatxCJ-DSow',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBd46PH30weqh4gAkKTewI63r7bU-AxXzBhs5Sl7j5ESL_r__ytRy_v-JrNhi-sXHzFvBn-UzJQkAIprV3J92UbwyMutwsziKkeLTfsI9EoDx2ENu_vtgzL-cP_A6t2dASd-ID0EfN9nwLnKW_cGfMUHFoV4eee5enKw0usHvPGokQFFo8RTrVI-l4LUEC274_2iE-Lnj0vt56nqC2vIUDTRMreS-bOiIfZd4ZHeFhasLqoBKsJlrRpVOaAqHkxX7PbZA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFH-Lkmxob4xRKTUuhInYOBw06G9iqU83S24XKpkwZfBKo2HZpsoZdaCHZmng8W9lJsxwyhiNbftVoixIc1uYd1J5MskQemFEuL4gj76ZZxWaB_nE_PEWq1tCdGSskf3gNI1XSq9NeOjvXHaOdaFlMpsF4pVA0PshpB7Pmjx6awj9TerMXZE85OXv2Ddgxmbbc-lVPVhm-Tqrxrw7kRBM1zRvY3rnQUIR6ITJn1AnwTi4d8To1cbYfyD_Rx7Drq9K2g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAG3pXKRhP3txveodhBLUaDPAopW6gOLAtOf4dg8od68L2tWU6-HI6p1LZZvsjolRjQNHhASBysNk2NLXzRnXOert5UVY2mQXUOP-_2o8-VaQ4-J-CihGrN7sx5i2JZEypawuByEQv_0vbefJTcqRrZwABnmepPRG21b0F6_UvjdYeDREHEaCKJOODNwC0lAsX2dmeP1BtpsQodc8R2utVTm--8Z7ihXhRU3mOPAegSgRPmqipG-BsCcCtw4LX4kuDfpw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAKf7Pc4Gyer0Wo9M6_cEAMp3Lxvn6kpQdqtYNLt-NO-MXZ4hju6ZPbzCIUkOXxyMAiNYeIn5SlFTARRdxIZD7uE2y_LdXgEbisyE1qdqI-LeYjAoCDkgdPc9FMzT_x56npIJ-WPatkFtdS3lMEEk6Q-lXMeDlvK5wffA9W8zWRxth05flOFTIS680nbwRy5mWSa8gPKnGJ8JLw46PInDNN_C560t01hfG1HQCkCBKYwjAtrPcEr5vi',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVpUKswuUqTxtJ1BX4VWXrGjSMLfA0ITCV3AbhTkT5ayu2jDDMwYlv5wtUhPF8h1wKXdzIf37-wPw0DWm-dky6PPyNNHVRFKW6DtAWS3vy-6Zt34HPOdQ82Y_RV0YpotmehL1wM1CMmQZxNAZ1MrOrkkKejplEt8-mhJLvAeUXF0JX221f7DH1ZuZaEMKDcOwXHaIzPv2ciTChaiDliT7JZx4tROJBJcEvNUdISybZVOAC-bqfSh3e2RiFL01dtZxuWg'
]

// Related products
const relatedProducts = [
  {
    id: 'saree-rel-1',
    name: 'Sunshine Yellow Floral Organza Saree',
    title: 'Sunshine Yellow Floral Organza Saree',
    price: 2700,
    originalPrice: '3,180.00৳',
    priceFormatted: '2,700.00৳',
    discount: '-15%',
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFH-Lkmxob4xRKTUuhInYOBw06G9iqU83S24XKpkwZfBKo2HZpsoZdaCHZmng8W9lJsxwyhiNbftVoixIc1uYd1J5MskQemFEuL4gj76ZZxWaB_nE_PEWq1tCdGSskf3gNI1XSq9NeOjvXHaOdaFlMpsF4pVA0PshpB7Pmjx6awj9TerMXZE85OXv2Ddgxmbbc-lVPVhm-Tqrxrw7kRBM1zRvY3rnQUIR6ITJn1AnwTi4d8To1cbYfyD_Rx7Drq9K2g'
  },
  {
    id: 'saree-rel-2',
    name: 'Crimson Red & Black Georgette Saree',
    title: 'Crimson Red & Black Georgette Saree',
    price: 2500,
    originalPrice: '3,200.00৳',
    priceFormatted: '2,500.00৳',
    discount: '-22%',
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUcjPKpA-3YPgxKQUL0GhEQjjPFcWhEis79hF-Oeghu3k5GQGRv6_4h147kaq5z-bc7kh3E9loJVyAdO45949n970rga600l1Y62odfSzxHy69GrZQEUjv1wdJfJSLaf3L35lv5d5SioG8qoAT9wM_jMDNOdBHBddv9nR55Gx3ryBHAl5c2BPzPKA2rBk6S2utN-Pd_UWx-_5wHTeQ8hQm_JovHIXA95AQX3pTyAI1dUd8WqbyjlGYq3w08SBDAhuspQ'
  },
  {
    id: 'saree-rel-3',
    name: 'Sky Blue Floral Breeze Organza Saree',
    title: 'Sky Blue Floral Breeze Organza Saree',
    price: 2400,
    originalPrice: '3,200.00৳',
    priceFormatted: '2,400.00৳',
    discount: '-25%',
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd46PH30weqh4gAkKTewI63r7bU-AxXzBhs5Sl7j5ESL_r__ytRy_v-JrNhi-sXHzFvBn-UzJQkAIprV3J92UbwyMutwsziKkeLTfsI9EoDx2ENu_vtgzL-cP_A6t2dASd-ID0EfN9nwLnKW_cGfMUHFoV4eee5enKw0usHvPGokQFFo8RTrVI-l4LUEC274_2iE-Lnj0vt56nqC2vIUDTRMreS-bOiIfZd4ZHeFhasLqoBKsJlrRpVOaAqHkxX7PbZA'
  },
  {
    id: 'saree-rel-4',
    name: 'Lilac Hand-Painted Floral Organza',
    title: 'Lilac Hand-Painted Floral Organza',
    price: 2600,
    originalPrice: '3,300.00৳',
    priceFormatted: '2,600.00৳',
    discount: '-21%',
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKf7Pc4Gyer0Wo9M6_cEAMp3Lxvn6kpQdqtYNLt-NO-MXZ4hju6ZPbzCIUkOXxyMAiNYeIn5SlFTARRdxIZD7uE2y_LdXgEbisyE1qdqI-LeYjAoCDkgdPc9FMzT_x56npIJ-WPatkFtdS3lMEEk6Q-lXMeDlvK5wffA9W8zWRxth05flOFTIS680nbwRy5mWSa8gPKnGJ8JLw46PInDNN_C560t01hfG1HQCkCBKYwjAtrPcEr5vi'
  }
]

function handleOrderNow() {
  addItem(
    {
      id: 'single-peach-saree',
      name: 'Soft Peach White Floral Organza Saree',
      price: 2700,
      originalPrice: 3500,
      image: selectedImage.value,
      sku: 'AOS-ORG-0824'
    },
    quantity.value,
    {
      fabric: selectedFabric.value,
      color: selectedSareeColor.value,
      designColor: selectedDesignColor.value
    }
  )
  router.push('/cart')
}

function buyViaWhatsApp() {
  const phone = '8801302694680'
  const title = 'Soft Peach White Floral Organza Saree'
  const price = '2,700.00৳'
  const url = window.location.href
  const msg = encodeURIComponent(`Hello Arts of Shop, I want to order "${title}" (Fabric: ${selectedFabric.value}, Color: ${selectedSareeColor.value}, Design Color: ${selectedDesignColor.value}, Qty: ${quantity.value}, Price: ${price}). Link: ${url}`)
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
}
</script>

<template>
  <main class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 pt-4 pb-16">
    <!-- Breadcrumb & Navigation Controls -->
    <nav aria-label="Breadcrumb" class="flex flex-wrap items-center justify-between text-xs sm:text-sm text-text-muted mb-6 pb-3 border-b border-border-hairline">
      <ol class="flex items-center space-x-2 flex-wrap">
        <li><router-link class="hover:text-primary transition-colors" to="/">Home</router-link></li>
        <li><span class="text-champagne-gold">/</span></li>
        <li><router-link class="hover:text-primary transition-colors" to="/category">Floral saree</router-link></li>
        <li><span class="text-champagne-gold">/</span></li>
        <li><router-link class="hover:text-primary transition-colors" to="/category">Elegant Hand Printed Saree</router-link></li>
        <li><span class="text-champagne-gold">/</span></li>
        <li aria-current="page" class="text-text-charcoal font-semibold">Soft Peach White Floral Organza Saree</li>
      </ol>
      <div class="hidden sm:flex items-center space-x-3 text-text-muted text-xs mt-2 sm:mt-0">
        <router-link class="hover:text-primary transition-colors flex items-center gap-1" to="/category">
          <span class="material-symbols-outlined text-[15px]">chevron_left</span> Prev
        </router-link>
        <router-link class="hover:text-primary transition-colors" to="/category">
          <span class="material-symbols-outlined text-[15px]">grid_view</span>
        </router-link>
        <router-link class="hover:text-primary transition-colors flex items-center gap-1" to="/category">
          Next <span class="material-symbols-outlined text-[15px]">chevron_right</span>
        </router-link>
      </div>
    </nav>

    <!-- BEGIN: ProductDetailsSection -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16" data-purpose="product-detail-hero">
      <!-- LEFT COLUMN: Product Gallery (Thumbnails + Main View) -->
      <div class="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
        <!-- Vertical Thumbnails -->
        <div class="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible flex-shrink-0 sm:w-24">
          <div 
            v-for="(img, idx) in images" 
            :key="idx"
            @click="selectedImage = img"
            class="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden cursor-pointer shadow-xs transition"
            :class="selectedImage === img ? 'border-2 border-primary' : 'border border-border-hairline opacity-75 hover:opacity-100 hover:border-primary'"
          >
            <img 
              :alt="`Soft Peach White Floral Organza Saree view ${idx + 1}`" 
              class="w-full h-full object-cover object-top hover:scale-105 transition duration-300" 
              :src="img" 
              decoding="async"
            />
          </div>
        </div>

        <!-- Main Focal Product Image -->
        <div class="relative flex-1 bg-surface-card rounded-xl overflow-hidden border border-border-hairline shadow-sm group">
          <img 
            alt="Soft Peach White Floral Organza Saree worn with modest styling and elegant drape" 
            class="w-full h-[480px] sm:h-[620px] object-cover object-center group-hover:scale-105 transition duration-500 cursor-zoom-in" 
            id="main-preview-image" 
            :src="selectedImage" 
            decoding="async"
          />
          <!-- Floating Badges -->
          <div class="absolute top-4 left-4 flex flex-col gap-1.5">
            <span class="bg-primary text-white text-[10px] font-bold px-2.5 py-1 uppercase rounded-full tracking-wider shadow-sm">
              Hand Painted
            </span>
            <span class="bg-surface-card/90 backdrop-blur-sm text-text-charcoal text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-border-hairline">
              100% Organza
            </span>
          </div>
          <!-- Expand / Zoom Button -->
          <button aria-label="Expand Image" class="absolute bottom-4 left-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-text-charcoal shadow-md flex items-center justify-center transition transform hover:scale-110" type="button">
            <span class="material-symbols-outlined text-[18px]">zoom_in</span>
          </button>
        </div>
      </div>

      <!-- RIGHT COLUMN: Purchase Options, Variations & Actions -->
      <div class="lg:col-span-6 flex flex-col justify-start space-y-5">
        <!-- Product Title & Rating -->
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text-charcoal tracking-tight mb-2">
            Soft Peach White Floral Organza Saree
          </h1>
          <!-- Reviews Star & Counter -->
          <div class="flex items-center space-x-2 text-sm">
            <div class="flex text-champagne-gold text-xs space-x-0.5">
              <span class="material-symbols-outlined text-[16px]">star</span>
              <span class="material-symbols-outlined text-[16px]">star</span>
              <span class="material-symbols-outlined text-[16px]">star</span>
              <span class="material-symbols-outlined text-[16px]">star</span>
              <span class="material-symbols-outlined text-[16px]">star</span>
            </div>
            <button 
              type="button" 
              @click="activeTab = 'reviews'"
              class="text-text-muted text-xs font-medium cursor-pointer hover:text-primary underline"
            >
              (6 customer reviews)
            </button>
            <span class="text-border-hairline">•</span>
            <span class="text-emerald-700 text-xs font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              In Stock
            </span>
          </div>
        </div>

        <!-- Price Block -->
        <div class="flex items-baseline gap-3 my-2">
          <span class="text-2xl sm:text-3xl font-bold text-primary">৳ 2,700.00</span>
          <span class="text-base text-gray-400 line-through">৳ 3,500.00</span>
          <span class="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase">-23% OFF</span>
        </div>

        <!-- Description Teaser -->
        <p class="text-text-muted text-sm leading-relaxed">
          Embrace soft femininity with this delicate Peach Organza saree. Adorned with white hand-painted flowers and finished with a dainty pearl border, this saree is a vision of grace. It pairs beautifully with modest styling, offering a serene and dreamy aesthetic perfect for daytime wear.
        </p>
        <hr class="border-border-hairline">

        <!-- VARIATION 1: Saree Fabrics -->
        <div class="space-y-2.5">
          <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider">
            Saree Fabrics : <span class="font-normal text-text-muted normal-case ml-1">{{ selectedFabric }}</span>
          </label>
          <div class="flex flex-wrap gap-2 text-xs">
            <button 
              v-for="fabric in fabrics" 
              :key="fabric"
              type="button"
              @click="selectedFabric = fabric"
              class="px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer"
              :class="selectedFabric === fabric ? 'border-2 border-primary bg-primary text-white font-semibold shadow-xs' : 'border border-border-hairline bg-surface-card text-text-charcoal hover:border-primary'"
            >
              {{ fabric }}
            </button>
          </div>
        </div>

        <!-- VARIATION 2: Saree Color Swatches -->
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider">
              Saree Color : <span class="font-normal text-text-muted normal-case ml-1">{{ selectedSareeColor }}</span>
            </label>
          </div>
          <!-- Swatches Grid matching reference colors -->
          <div class="flex flex-wrap gap-2 items-center">
            <button 
              v-for="color in sareeColors" 
              :key="color.name"
              type="button"
              @click="selectedSareeColor = color.name"
              class="color-swatch w-5 h-5 rounded transition-transform hover:scale-110 cursor-pointer"
              :class="[
                color.class,
                selectedSareeColor === color.name ? 'border-2 border-primary shadow-xs ring-2 ring-primary/30 ring-offset-1' : 'border border-border-hairline'
              ]"
              :title="color.name"
            ></button>
          </div>
        </div>

        <!-- VARIATION 3: Saree Design Color Swatches -->
        <div class="space-y-2.5">
          <label class="block text-xs font-bold text-text-charcoal uppercase tracking-wider">
            Saree Design Color : <span class="font-normal text-text-muted normal-case ml-1">{{ selectedDesignColor }}</span>
          </label>
          <div class="flex flex-wrap gap-2 items-center">
            <button 
              v-for="color in designColors" 
              :key="color.name"
              type="button"
              @click="selectedDesignColor = color.name"
              class="color-swatch w-5 h-5 rounded transition-transform hover:scale-110 cursor-pointer"
              :class="[
                color.class,
                selectedDesignColor === color.name ? 'border-2 border-primary ring-2 ring-primary/30 ring-offset-1' : 'border border-border-hairline'
              ]"
              :title="color.name"
            ></button>
          </div>
        </div>

        <!-- Quantity & Order CTA Block -->
        <div class="pt-2 space-y-3">
          <div class="flex items-center gap-3">
            <!-- Counter -->
            <div class="inline-flex items-center border border-border-hairline rounded-lg bg-surface-card overflow-hidden">
              <button 
                type="button"
                @click="quantity > 1 ? quantity-- : null"
                class="w-9 h-11 text-text-charcoal hover:bg-canvas-cream transition flex items-center justify-center text-sm font-semibold select-none cursor-pointer"
              >-</button>
              <input 
                v-model.number="quantity"
                class="w-12 h-11 text-center text-text-charcoal font-semibold border-0 focus:ring-0 text-sm p-0 bg-transparent" 
                min="1" 
                type="number"
              />
              <button 
                type="button"
                @click="quantity++"
                class="w-9 h-11 text-text-charcoal hover:bg-canvas-cream transition flex items-center justify-center text-sm font-semibold select-none cursor-pointer"
              >+</button>
            </div>
            <!-- Primary ORDER NOW Button -->
            <button 
              type="button"
              @click="handleOrderNow"
              class="flex-1 bg-primary hover:bg-crimson-hover text-white font-bold tracking-wider text-xs sm:text-sm py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 uppercase active:scale-95 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
              ORDER NOW
            </button>
          </div>
          <!-- Secondary WhatsApp Direct Order Button -->
          <button 
            type="button"
            @click="buyViaWhatsApp"
            class="w-full bg-whatsapp-green hover:brightness-105 text-white font-bold tracking-wide text-xs sm:text-sm py-3 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-2 uppercase active:scale-95 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">chat</span>
            ORDER ON WHATSAPP
          </button>
        </div>

        <!-- Trust & Shipping Perks Grid (4 Cards from reference) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div class="bg-surface-card border border-border-hairline rounded-xl p-3 flex items-center gap-3 shadow-xs">
            <span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[18px]">public</span>
            </span>
            <span class="text-xs font-semibold text-text-charcoal">Worldwide Shipping available</span>
          </div>
          <div class="bg-surface-card border border-border-hairline rounded-xl p-3 flex items-center gap-3 shadow-xs">
            <span class="w-8 h-8 rounded-full bg-champagne-gold/15 text-champagne-gold flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[18px]">local_shipping</span>
            </span>
            <span class="text-xs font-semibold text-text-charcoal">Express shipping in 10-15 days</span>
          </div>
          <div class="bg-surface-card border border-border-hairline rounded-xl p-3 flex items-center gap-3 shadow-xs">
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[18px]">verified_user</span>
            </span>
            <span class="text-xs font-semibold text-text-charcoal">Check and return on delivery</span>
          </div>
          <div class="bg-surface-card border border-border-hairline rounded-xl p-3 flex items-center gap-3 shadow-xs">
            <span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
            </span>
            <span class="text-xs font-semibold text-text-charcoal">Customize product available</span>
          </div>
        </div>

        <!-- Wishlist & Compare Actions -->
        <div class="flex items-center gap-6 pt-1 text-xs font-semibold text-text-muted">
          <button class="hover:text-primary flex items-center gap-1.5 transition-colors cursor-pointer" type="button">
            <span class="material-symbols-outlined text-[16px]">favorite</span> Add to wishlist
          </button>
          <button class="hover:text-primary flex items-center gap-1.5 transition-colors cursor-pointer" type="button">
            <span class="material-symbols-outlined text-[16px]">sync</span> Add to compare
          </button>
        </div>

        <!-- Metadata & Social Sharing -->
        <div class="border-t border-border-hairline pt-3 space-y-1.5 text-xs text-text-muted">
          <p><strong class="font-semibold text-text-charcoal">SKU:</strong> AOS-ORG-0824</p>
          <p><strong class="font-semibold text-text-charcoal">Category:</strong> <router-link class="text-primary hover:underline font-medium" to="/category">Elegant Hand Printed Saree</router-link></p>
          <div class="flex items-center gap-2 pt-1">
            <strong class="font-semibold text-text-charcoal">Share:</strong>
            <a class="w-7 h-7 rounded-full bg-surface-card border border-border-hairline hover:bg-primary hover:text-white flex items-center justify-center transition text-text-charcoal" href="#" aria-label="Facebook">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </a>
            <a class="w-7 h-7 rounded-full bg-surface-card border border-border-hairline hover:bg-whatsapp-green hover:text-white flex items-center justify-center transition text-text-charcoal" href="https://wa.me/8801302694680" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <span class="material-symbols-outlined text-[14px]">chat</span>
            </a>
            <a class="w-7 h-7 rounded-full bg-surface-card border border-border-hairline hover:bg-pink-600 hover:text-white flex items-center justify-center transition text-text-charcoal" href="#" aria-label="Instagram">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- END: ProductDetailsSection -->

    <!-- BEGIN: ProductTabsAndFeatures -->
    <section class="border-t border-border-hairline pt-10 pb-16" data-purpose="product-tabs-and-narrative">
      <!-- Centered Tab Headers (DESCRIPTION and REVIEWS (6)) -->
      <div class="flex items-center justify-center border-b border-border-hairline mb-8 space-x-10 text-sm font-semibold tracking-wider uppercase">
        <button 
          type="button"
          @click="activeTab = 'description'"
          class="pb-3 transition font-bold cursor-pointer flex items-center gap-2"
          :class="activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-text-charcoal'"
        >
          <span>DESCRIPTION</span>
        </button>
        <button 
          type="button"
          @click="activeTab = 'reviews'"
          class="pb-3 transition font-bold cursor-pointer flex items-center gap-2"
          :class="activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-text-charcoal'"
        >
          <span>REVIEWS (6)</span>
        </button>
      </div>

      <!-- Tab Content: Detailed Description -->
      <div v-show="activeTab === 'description'" class="max-w-4xl mx-auto space-y-6 text-text-charcoal text-sm leading-relaxed px-4">
        <p>
          Step into elegance with this <strong class="font-bold text-text-charcoal">Soft Peach White Floral Organza Saree</strong>. The pastel peach hue is soothing to the eyes, while the <strong class="font-bold text-text-charcoal">scattered white floral prints</strong> add a touch of vintage romance. The fabric has a beautiful sheer quality that looks ethereal when draped. A standout feature is the <strong class="font-bold text-text-charcoal">delicate pearl beaded border</strong> running along the edges, which gives the saree a rich, finished look without being too heavy. Whether you style it with a matching hijab or a simple blouse, this outfit exudes a quiet sophistication suitable for family gatherings or office events.
        </p>
        <!-- Key Features List -->
        <div class="space-y-3 pt-2">
          <h2 class="text-sm font-bold text-text-charcoal flex items-center gap-2 uppercase tracking-wide">
            <span class="material-symbols-outlined text-champagne-gold text-[18px]">auto_awesome</span> Key Features:
          </h2>
          <ul class="space-y-2 text-text-muted pl-2">
            <li class="flex items-start gap-2">
              <span class="text-champagne-gold font-bold">•</span>
              <span><strong class="text-text-charcoal">Pastel peach/pink organza</strong> for a soft, dreamy vibe</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-champagne-gold font-bold">•</span>
              <span><strong class="text-text-charcoal">White floral motifs</strong> that blend gently with the base color</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-champagne-gold font-bold">•</span>
              <span>Elegant <strong class="text-text-charcoal">pearl bead border</strong> trimming the edges</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-champagne-gold font-bold">•</span>
              <span>Lightweight and comfortable for <strong class="text-text-charcoal">all-day wear</strong></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-champagne-gold font-bold">•</span>
              <span>Perfect for <strong class="text-text-charcoal">modest fashion styling</strong> and elegant day functions</span>
            </li>
          </ul>
        </div>

        <!-- Visual Storytelling & Quality 3-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-6xl mx-auto px-4">
          <!-- Feature 1: 100% Pure Organza -->
          <div class="flex flex-col bg-surface-card border border-border-hairline rounded-xl overflow-hidden shadow-xs hover:shadow-md transition">
            <div class="h-64 overflow-hidden bg-surface-container-low">
              <img alt="100% Pure Organza delicate sheer weave" class="w-full h-full object-cover object-left-bottom hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3pXKRhP3txveodhBLUaDPAopW6gOLAtOf4dg8od68L2tWU6-HI6p1LZZvsjolRjQNHhASBysNk2NLXzRnXOert5UVY2mQXUOP-_2o8-VaQ4-J-CihGrN7sx5i2JZEypawuByEQv_0vbefJTcqRrZwABnmepPRG21b0F6_UvjdYeDREHEaCKJOODNwC0lAsX2dmeP1BtpsQodc8R2utVTm--8Z7ihXhRU3mOPAegSgRPmqipG-BsCcCtw4LX4kuDfpw" decoding="async" loading="lazy">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-start">
              <h3 class="text-lg font-bold text-text-charcoal mb-3 border-b pb-2 border-border-hairline">
                100% Pure Organza
              </h3>
              <ul class="space-y-2.5 text-xs text-text-muted">
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Lightweight and airy texture, creating an ethereal look.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Soft and smooth texture makes it perfect for summers.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Delicate and elegant drape that hugs the body.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Feature 2: Hand-made -->
          <div class="flex flex-col bg-surface-card border border-border-hairline rounded-xl overflow-hidden shadow-xs hover:shadow-md transition">
            <div class="h-64 overflow-hidden bg-surface-container-low">
              <img alt="Hand-made artisan floral brush work" class="w-full h-full object-cover object-bottom hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC3kBV3OnJBgfwSgGPcpD7pyFoDe0C4-2w8NeRVI4fpSsTa5BTw_EW0uXD7UmVm4kKjPlA-p9pYuuZ6ZS6yOOoc5_Pmhv16wE6nkljYYZ65E-3Bahbcw8aaghJ5KeUEVYCktkrjzAuXewaQ2olnLgDhO3oWlDm8Ckg2xiEpFUDvX43RzZBtKYSZow9JWcASIYJOvuIf2XW-h7uP_I_-pvMB0exfEngJQcfvF-KkMTPSLql5bkhzZfqPr4aatxCJ-DSow" decoding="async" loading="lazy">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-start">
              <h3 class="text-lg font-bold text-text-charcoal mb-3 border-b pb-2 border-border-hairline">
                Hand-made Artistry
              </h3>
              <ul class="space-y-2.5 text-xs text-text-muted">
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Delicately scattered flowers and motifs create a stunning contrast against the natural color backdrop.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Each hand-painted saree is a unique piece of art, reflecting the skill and creativity of the artisan.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Feature 3: Soft Organza Fabric for Quality and Sustainability -->
          <div class="flex flex-col bg-surface-card border border-border-hairline rounded-xl overflow-hidden shadow-xs hover:shadow-md transition">
            <div class="h-64 overflow-hidden bg-surface-container-low">
              <img alt="Soft Organza Fabric for Quality and Sustainability" class="w-full h-full object-cover object-right-bottom hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVpUKswuUqTxtJ1BX4VWXrGjSMLfA0ITCV3AbhTkT5ayu2jDDMwYlv5wtUhPF8h1wKXdzIf37-wPw0DWm-dky6PPyNNHVRFKW6DtAWS3vy-6Zt34HPOdQ82Y_RV0YpotmehL1wM1CMmQZxNAZ1MrOrkkKejplEt8-mhJLvAeUXF0JX221f7DH1ZuZaEMKDcOwXHaIzPv2ciTChaiDliT7JZx4tROJBJcEvNUdISybZVOAC-bqfSh3e2RiFL01dtZxuWg" decoding="async" loading="lazy">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-start">
              <h3 class="text-lg font-bold text-text-charcoal mb-3 border-b pb-2 border-border-hairline">
                Sustainable &amp; Pure
              </h3>
              <ul class="space-y-2.5 text-xs text-text-muted">
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>Delicate and elegant drape that gracefully complements your silhouette.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>We embrace sustainability with eco-friendly techniques like water colors and hand painting.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary text-[15px] shrink-0">ac_unit</span>
                  <span>This is our heartfelt commitment to a greener, artisan-empowered future.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: REVIEWS (6) WITH IMAGES -->
      <div v-show="activeTab === 'reviews'" class="max-w-4xl mx-auto space-y-8 px-4">
        <!-- Rating Overview Card -->
        <div class="bg-surface-card rounded-2xl border border-border-hairline p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-center sm:text-left">
            <div class="text-4xl sm:text-5xl font-bold font-serif text-text-charcoal leading-none">5.0 <span class="text-lg text-text-muted font-normal font-sans">/ 5.0</span></div>
            <div class="flex text-champagne-gold text-base space-x-1 my-2 justify-center sm:justify-start">
              <span class="material-symbols-outlined text-[20px]">star</span>
              <span class="material-symbols-outlined text-[20px]">star</span>
              <span class="material-symbols-outlined text-[20px]">star</span>
              <span class="material-symbols-outlined text-[20px]">star</span>
              <span class="material-symbols-outlined text-[20px]">star</span>
            </div>
            <p class="text-xs text-text-muted">Based on 6 authentic customer reviews with verified photos</p>
          </div>
          <div class="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              <span class="material-symbols-outlined text-[18px]">verified</span> 100% Recommended by Buyers
            </span>
            <span class="text-xs text-text-muted font-medium">All reviews from verified boutique purchases</span>
          </div>
        </div>

       

        <!-- Individual Reviews with Images -->
        <div class="space-y-5">
          <div 
            v-for="(rev, idx) in reviews" 
            :key="idx"
            class="bg-surface-card rounded-2xl border border-border-hairline p-6 shadow-xs space-y-4"
          >
            <!-- Review Header -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#16202c] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                  {{ rev.author.charAt(0) }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-sm text-text-charcoal">{{ rev.author }}</h4>
                    <span class="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                      <span class="material-symbols-outlined text-[12px]">verified</span> Verified Buyer
                    </span>
                  </div>
                  <span class="text-xs text-text-muted">{{ rev.location }}</span>
                </div>
              </div>

              <!-- Rating & Timestamp -->
              <div class="text-right">
                <div class="flex text-champagne-gold text-xs justify-end">
                  <span v-for="s in rev.rating" :key="s" class="material-symbols-outlined text-[15px]">star</span>
                </div>
                <span class="text-[11px] text-gray-400 mt-0.5 block">{{ rev.date }}</span>
              </div>
            </div>

            <!-- Review Feedback Text -->
            <p class="text-xs sm:text-sm text-text-charcoal leading-relaxed pl-1 sm:pl-13">
              "{{ rev.comment }}"
            </p>

            <!-- Customer Review Attached Images -->
            <div v-if="rev.images && rev.images.length > 0" class="pl-1 sm:pl-13 pt-1">
              <div class="flex flex-wrap gap-2.5">
                <div 
                  v-for="(img, imgIndex) in rev.images"
                  :key="imgIndex"
                  @click="previewModalImage = img"
                  class="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden border border-border-hairline cursor-pointer group shadow-xs hover:border-primary transition"
                  title="Click to view full photo"
                >
                  <img 
                    :alt="`${rev.author}'s review photo ${imgIndex + 1}`"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    :src="img"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <span class="material-symbols-outlined text-[18px]">zoom_in</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Helpful Action -->
            <div class="pl-1 sm:pl-13 pt-2 flex items-center gap-4 text-xs text-text-muted border-t border-border-hairline">
              <span class="text-[11px]">Was this review helpful?</span>
              <button type="button" class="flex items-center gap-1 hover:text-primary transition font-medium cursor-pointer">
                <span class="material-symbols-outlined text-[14px]">thumb_up</span>
                <span>Yes ({{ 12 + idx * 3 }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END: ProductTabsAndFeatures -->

    <!-- Customer Photo Lightbox Modal -->
    <div 
      v-if="previewModalImage" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      @click="previewModalImage = ''"
    >
      <div class="relative max-w-2xl max-h-[90vh] bg-surface-card rounded-2xl overflow-hidden shadow-2xl p-2" @click.stop>
        <button 
          type="button" 
          @click="previewModalImage = ''"
          class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Close Preview"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
        <img 
          :src="previewModalImage" 
          alt="Customer Review Photo Expanded View" 
          class="w-full max-h-[80vh] object-contain rounded-xl"
        />
        <div class="p-3 text-center text-xs text-text-muted font-medium">
          Verified Buyer Photo • Soft Peach White Floral Organza Saree
        </div>
      </div>
    </div>

    <!-- BEGIN: CustomerReviewsSneakPeek / Related Products -->
    <section class="border-t border-border-hairline pt-12 pb-16" data-purpose="related-products">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-4 sm:px-6">
        <div class="space-y-1">
          <span class="text-[11px] font-bold text-primary uppercase tracking-[0.2em] block">Handcrafted Curations</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-text-charcoal tracking-tight">Related Products</h2>
          <p class="text-xs text-text-muted">Discover matching hand-painted floral drapes and artisanal organza sarees</p>
        </div>
        <router-link to="/category" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-crimson-hover transition uppercase tracking-wider group">
          <span>View All Sarees</span>
          <span class="material-symbols-outlined text-[14px] transform group-hover:translate-x-1 transition-transform">chevron_right</span>
        </router-link>
      </div>

      <!-- 4 Standardized Luxury Product Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6">
        <ProductCard 
          v-for="product in relatedProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </section>
  </main>
</template>
