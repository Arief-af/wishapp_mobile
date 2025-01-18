import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@/pages/index.vue";
import IndexAuthPage from "@/pages/auth/index/Index.vue";
import LoginPage from "@/pages/auth/login/Index.vue";
import RegisterPage from "@/pages/auth/register/Index.vue";
import HomePage from "@/pages/wish/index.vue";
import detailWish from "@/pages/wish/detail/index.vue";
import history from "@/pages/wish/history/index.vue";
import income from "@/pages/income/index.vue";
import profile from "@/pages/auth/profile/Index.vue";
import report from "@/pages/report/index.vue";
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
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/wish/detail/:id",
    name: "detailWish",
    component: detailWish,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/history",
    name: "hisory",
    component: history,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/income",
    name: "income",
    component: income,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/report",
    name: "report",
    component: report,
    meta: { requiresAuth: false },  // Protect this route
  },
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

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirect to the login page if not logged in
    next({ name: "Login" });
  } else {
    // Proceed to the requested route
    next();
  }
});

export default router;
