import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
/* import Home from "../views/Landing.vue" */

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home Page",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatInterface.vue"),
  },
  {
    path: "/name",
    name: "Name",
    component: () => import("../views/Name.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Ensuring user has username before entering chat page
router.beforeEach((to, from, next) => {
  if (
    to.name === "Chat" &&
    !(
      localStorage.getItem("name") !== "" &&
      localStorage.getItem("name") !== null
    )
  )
    next({ name: "Name", params: { next: "Chat" } });
  else next();
});

export default router;
