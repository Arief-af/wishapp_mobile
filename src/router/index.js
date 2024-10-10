import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@/pages/index.vue"
import IndexAuthPage from "@/pages/auth/index/Index.vue"
import LoginPage from "@/pages/auth/login/Index.vue"
import RegisterPage from "@/pages/auth/register/Index.vue"
import HomePage from "@/pages/home/index.vue"

const routes = [
    {
        path: "/",
        name: "index",
        component: IndexAuthPage
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage
    },
    {
        path: "/home",
        name: "home",
        component: HomePage
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});


export default router;
