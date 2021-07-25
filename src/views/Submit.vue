<template>
     <div class="bg-dark main pt-5">
          <Form />
          <Search />
     </div>
</template>

<script>
import Form from "../components/Form.vue";
import Search from "../components/Search.vue";

export default {
     name: "Submit",
     components: { Form, Search },
     props: {},
     data() {
          return {};
     },
     created() {},
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
