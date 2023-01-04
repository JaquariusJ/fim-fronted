import { createRouter, createWebHistory } from 'vue-router'

const LoginIn = () => import("@/components/content/login/LoginIn.vue")
const Home = () => import("@/components/content/home/Home.vue")

const Registry = () => import("@/components/content/registry/Registry.vue")

const keepAccount = () => import("@/components/content/consume/accounts/AccountList")

const reports = () => import('@/components/content/consume/reports/ReportsList.vue')

const routes = [
  {
    path: "",
    redirect: "/accounts"
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
    component: Home,
    children: [
      {
        path: "",
        redirect: "/accounts"
      },
      {
        path: "/accounts",
        component: keepAccount
      },
      {
        path: "/reports",
        component: reports
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


