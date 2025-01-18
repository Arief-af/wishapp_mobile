import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@/pages/index.vue";
import IndexAuthPage from "@/pages/auth/index/Index.vue";
import LoginPage from "@/pages/auth/login/Index.vue";
import RegisterPage from "@/pages/auth/register/Index.vue";
import HomePage from "@/pages/wish/index.vue";
import detailWish from "@/pages/wish/detail/index.vue";
import history from "@/pages/wish/history/index.vue";
import income from "@/pages/income/index.vue";
import profilePage from "@/pages/auth/profile/Index.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexAuthPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/wish/detail/:id",
    name: "detailWish",
    component: detailWish,
  },
  {
    path: "/history",
    name: "hisory",
    component: history,
  },
  {
    path: "/income",
    name: "income",
    component: income,
  },
  {
    path: "/profile",
    name: "profile",
    component: profilePage,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cek jika pengguna sudah login
  if (authStore.isLoggedIn) {
  }

  next();
});
export default router;
