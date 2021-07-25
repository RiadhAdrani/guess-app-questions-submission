<template>
     <div class="d-flex flex-md-row flex-column mx-auto justify-content-center rounded">
          <router-link class="mx-3 my-dm-0 my-2" to="/"
               ><button class="btn btn-dark nav-bar-btn p-3">Submit Here</button></router-link
          >
          <router-link class="mx-3 my-dm-0 my-2" to="/login"
               ><button class="btn btn-dark nav-bar-btn p-3">Control Room</button></router-link
          >
          <router-link class="mx-3 my-dm-0 my-2" to="/about"
               ><button class="btn btn-dark nav-bar-btn p-3">About The App</button></router-link
          >
          <router-link class="mx-3 my-dm-0 my-2" to="/dashboard"
               ><button class="btn btn-dark nav-bar-btn p-3">Dashboard</button></router-link
          >
     </div>
</template>

<script>
export default {
     name: "NavBar",
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
