import { ref, computed } from 'vue'

const items = ref([
  {
    id: 1,
    name: 'The Saffron Marigold Lehenga',
    sku: 'AOS-LHG-092',
    fabric: 'Pure Silk & Zardozi',
    color: 'Saffron Gold',
    size: 'Semi-Stitched Free Size',
    price: 4000,
    originalPrice: 4800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQyDL1qHKSbNV4slu0B3VKUCs5Z-wcBMa-hT_qozB-QcZGniLN-Hk0vmWCS4TZfXV-GK5dp-3fRKx_rpb-rYvQsLhp2AJquOK0xNnEAEPK0ixFM-oqCnkru3LW782SAecb6vYXB66otcLcgP7Hp0FdeZFz8bFgIilbn2UmSLJYCsny2jfL0Kvwo01UlL6MRxdkrs7hf08kfKe8-gL2-LEfm8j8BzpbObHSMovfBMERnY2fApcvyUVkLhWsV7uGxQxe7Q',
    quantity: 1,
  }
])

const shippingDestination = ref('inside')
const couponCode = ref('EID10')
const discount = ref(407)
const isCouponApplied = ref(true)
const toastMessage = ref('')

const shippingCost = computed(() => {
  return shippingDestination.value === 'inside' ? 70 : 150
})

const itemsSubtotal = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const grandTotal = computed(() => {
  const disc = isCouponApplied.value ? discount.value : 0
  return Math.max(0, itemsSubtotal.value - disc + shippingCost.value)
})

const itemCount = computed(() => {
  return items.value.reduce((sum, item) => sum + item.quantity, 0)
})

function showToast(msg) {
  toastMessage.value = msg
  setTimeout(() => {
    if (toastMessage.value === msg) {
      toastMessage.value = ''
    }
  }, 3000)
}

function updateQuantity(id, newQty) {
  const item = items.value.find(i => i.id === id)
  if (item) {
    if (newQty > 0) {
      item.quantity = newQty
    } else {
      removeItem(id)
    }
  }
}

function removeItem(id) {
  items.value = items.value.filter(i => i.id !== id)
  showToast('Item removed from shopping bag')
}

function addItem(product, qty = 1, options = {}) {
  const existing = items.value.find(i => i.id === product.id)
  if (existing) {
    existing.quantity += qty
  } else {
    items.value.push({
      id: product.id || Date.now(),
      name: product.name || product.title,
      sku: product.sku || 'AOS-ART-001',
      fabric: options.fabric || product.fabric || 'Organza Silk',
      color: options.color || product.color || 'Artisanal Color',
      designColor: options.designColor || '',
      size: options.size || product.size || 'Standard Fit',
      price: product.price || 2700,
      originalPrice: product.originalPrice || 3500,
      image: product.image || product.img,
      quantity: qty,
    })
  }
  showToast(`Added "${product.name || product.title}" to shopping bag!`)
}

function applyCoupon(code) {
  if (code.trim().toUpperCase() === 'EID10') {
    isCouponApplied.value = true
    discount.value = Math.round(itemsSubtotal.value * 0.1) || 407
    showToast('Coupon EID10 applied! 10% discount added.')
  } else if (code.trim()) {
    showToast('Invalid coupon code. Try EID10 for 10% off.')
  }
}

function clearCart() {
  items.value = []
  showToast('Shopping bag cleared.')
}

export function useCart() {
  return {
    items,
    shippingDestination,
    shippingCost,
    couponCode,
    discount,
    isCouponApplied,
    itemsSubtotal,
    grandTotal,
    itemCount,
    toastMessage,
    updateQuantity,
    removeItem,
    addItem,
    applyCoupon,
    clearCart,
    showToast
  }
}
