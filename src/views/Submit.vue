<template>
     <div class="bg-dark main pt-5">
          <Form :questions="getQuestions" />
          <Search />
     </div>
</template>

<script>
import Form from "../components/Form.vue";
import Search from "../components/Search.vue";
import Question from "../models/Question";

export default {
     name: "Submit",
     components: { Form, Search },
     computed: {
          getQuestions() {
               return this.list;
          },
     },
     data() {
          return { list: [] };
     },
     created() {
          Question.retrieveList({
               onSuccess: (list) => {
                    this.list = list;
               },
          });
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
