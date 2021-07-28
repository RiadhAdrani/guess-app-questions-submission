<template>
     <div class="d-flex flex-md-row flex-column mx-auto justify-content-center rounded mt-4">
          <button
               class="btn btn-dark nav-bar-btn p-3 border border-light mx-md-3 mx-auto my-2"
               v-on:click="goHome()"
          >
               Submit Here
          </button>
          <button
               class="btn btn-dark nav-bar-btn p-3 border-light mx-md-3 mx-auto my-2"
               v-on:click="goLogin()"
          >
               Dashboard
          </button>
          <button
               class="btn btn-dark nav-bar-btn p-3 border-light mx-md-3 mx-auto my-2"
               v-on:click="goAbout()"
          >
               About The App
          </button>
          <router-link to="/dashboard">Dashboard</router-link>
     </div>
</template>

<script>
export default {
     props: {
          currentUser: String,
     },
     computed: {
          getUser() {
               return this.currentUser;
          },
     },
     name: "NavBar",
     methods: {
          redirectTo({ name = "submit", path = "/", data = {} }) {
               this.$router.push({ name: name, query: { redirect: path }, params: data });
          },
          goHome() {
               this.redirectTo({ name: "Submit", path: "/" });
          },
          goLogin() {
               if (this.getUser !== undefined) {
                    this.goDashboard();
               } else {
                    this.redirectTo({ name: "Login", path: "/login" });
               }
          },
          goDashboard() {
               this.redirectTo({ name: "Dashboard", path: "/dashboard" });
          },
          goAbout() {
               this.redirectTo({ name: "About", path: "/about" });
          },
     },
};
</script>

<style scoped>
.nav-bar-btn {
     height: 100%;
}

@media (max-width: 1000px) {
     .nav-bar-btn {
          width: 80%;
     }
}
</style>
