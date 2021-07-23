<template>
     <div class="bg-dark main pt-5">
          <Form />
          <Search />
          <p class="text-light mt-3">Thank you for contributing!</p>
     </div>
</template>

<script>
import Form from "./Form.vue";
import Search from "./Search.vue";

export default {
     components: { Form, Search },
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
