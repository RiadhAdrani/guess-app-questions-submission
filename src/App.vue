<template>
     <div class="bg-dark main pt-5">
          <img src="../src/assets/logo_solid.png" class="circular-img mb-5" />
          <Form />
          <p class="text-light">Thank you for contributing!</p>
     </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
     name: "App",
     components: {
          Form,
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
