<template>
     <div class="bg-dark main pt-5">
          <img src="../src/assets/logo_solid.png" class="circular-img mb-5" />
          <NavBar />
          <router-view />
     </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
     name: "App",
     components: { NavBar },
     data() {
          return {};
     },
     created: function() {
          this.$router.push({ name: "Submit", query: { redirect: "/" } });
     },
};
</script>

<style>
.circular-img {
     border-radius: 50%;
     max-width: 150px;
}

.html {
     padding-top: 0%;
}

#app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     background-color: #2c3e50;
}
</style>
