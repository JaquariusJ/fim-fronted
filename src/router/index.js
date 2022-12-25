import { createRouter, createWebHistory } from 'vue-router'

const LoginIn = () => import("@/components/content/login/LoginIn.vue")

const routes = [
  {
    path: "",
    component: LoginIn
  },
  {
    path: "/login",
    component: LoginIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

