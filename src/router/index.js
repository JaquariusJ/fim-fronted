import { createRouter, createWebHistory } from 'vue-router'

const LoginIn = () => import("@/components/content/login/LoginIn.vue")
const Home = () => import("@/components/content/home/Home.vue")

const Registry = () => import("@/components/content/registry/Registry.vue")


const routes = [
  {
    path: "",
    component: LoginIn
  },
  {
    path: "/login",
    component: LoginIn
  },
  {
    path: "/registry",
    component: Registry
  },
  {
    path: "/home",
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

