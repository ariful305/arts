import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ReviewsView from '../views/ReviewsView.vue'
import FaqView from '../views/FaqView.vue'
import ContactView from '../views/ContactView.vue'
import AccountView from '../views/AccountView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    alias: ['/index.html']
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView,
    alias: ['/caregory.html', '/caregory', '/category.html', '/shop']
  },
  {
    path: '/single',
    name: 'single',
    component: SingleProductView,
    alias: ['/single.html', '/product/:id?']
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    alias: ['/cart.html']
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    alias: ['/checkout.html']
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewsView,
    alias: ['/review', '/reviews.html', '/review.html']
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqView,
    alias: ['/faqs', '/faq.html', '/faqs.html']
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    alias: ['/contact-us', '/contact.html', '/contact-us.html']
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    alias: ['/login', '/register', '/account.html', '/my-account']
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

export default router
