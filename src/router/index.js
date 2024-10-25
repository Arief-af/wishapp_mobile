import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@/pages/index.vue";
import IndexAuthPage from "@/pages/auth/index/Index.vue";
import LoginPage from "@/pages/auth/login/Index.vue";
import RegisterPage from "@/pages/auth/register/Index.vue";
import HomePage from "@/pages/home/index.vue";
import Profile from "@/pages/profile/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexAuthPage,
    meta: { transition: "slide-left" },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { transition: "slide-left" },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: { transition: "slide-left" },
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    meta: { transition: "slide-left" },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { transition: "slide-left" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
