import { ref } from 'vue'

const isMobileNavOpen = ref(false)
const isCartDrawerOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

function closeMobileNav() {
  isMobileNavOpen.value = false
}

function openMobileNav() {
  isMobileNavOpen.value = true
}

function toggleCartDrawer() {
  isCartDrawerOpen.value = !isCartDrawerOpen.value
}

function openCartDrawer() {
  isCartDrawerOpen.value = true
}

function closeCartDrawer() {
  isCartDrawerOpen.value = false
}

export function useUI() {
  return {
    isMobileNavOpen,
    isCartDrawerOpen,
    isSearchOpen,
    searchQuery,
    toggleMobileNav,
    closeMobileNav,
    openMobileNav,
    toggleCartDrawer,
    openCartDrawer,
    closeCartDrawer
  }
}
