import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import AppView from "@/components/AppView.vue";
import { useAuthStore } from "@/store/authStore";
import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: "/chats",
    component: AppView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && authStore.isAuthenticated) {
    next("/chats");
  } else {
    next();
  }
});

export default router;
