<template>
     <div class="bg-dark main pt-5">
          <Header />
          <NavBar />
          <router-view />
          <Footer />
     </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
     name: "App",
     components: { NavBar, Header, Footer },
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
     font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
          sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     background-color: #2c3e50;
}
</style>
