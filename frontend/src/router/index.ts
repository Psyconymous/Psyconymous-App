import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Landing.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home Page",
    component: Home,
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatInterface.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
