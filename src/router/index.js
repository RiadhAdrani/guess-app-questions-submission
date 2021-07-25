import { createWebHistory, createRouter } from "vue-router";
import Submit from "../views/Submit.vue";
import Dashboard from "../views/Dashboard.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";

const routes = [
     {
          path: "/",
          name: "Submit",
          component: Submit,
     },
     {
          path: "/login",
          name: "Login",
          component: Login,
     },
     {
          path: "/dashboard/",
          name: "Dashboard",
          component: Dashboard,
     },
     {
          path: "/about/",
          name: "About",
          component: About,
     },
];

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     base: "/",
     routes,
});

export default router;
