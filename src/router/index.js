import { createWebHistory, createRouter } from "vue-router";
import Submit from "../components/Submit.vue";
import Dashboard from "../components/Dashboard.vue";
import About from "../components/About.vue";

const routes = [
     {
          path: "/",
          name: "Submit",
          component: Submit,
     },
     {
          path: "/dashboard",
          name: "Dashboard",
          component: Dashboard,
     },
     {
          path: "/about",
          name: "About",
          component: About,
     },
];

const router = createRouter({
     history: createWebHistory(),
     routes,
});

export default router;
