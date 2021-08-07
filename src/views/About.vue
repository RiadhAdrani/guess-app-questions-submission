<template>
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4 pb-4"
     >
          <h1 class="text-light mb-2">About</h1>
          <p class="mt-2">
               We have nothing for you today, maybe try again later, or just help us with
               <span class="btn btn-success p-1 px-2 ml-1" @click="redirectToSubmit"
                    >another question (only {{ getQuestionsNumber }} of them in the database)
                    ?</span
               >
          </p>

          <div class="d-flex flex-row flex-wrap my-2">
               <div
                    class="btn btn-secondary mx-1 my-1"
                    v-for="topic in getNumberOfQuestions"
                    v-bind:key="topic.topic"
               >
                    <p class="mb-0">
                         {{ topic.topic
                         }}<span class="btn btn-primary ml-2">{{ topic.number }}</span>
                    </p>
               </div>
          </div>
     </div>
</template>
<script>
export default {
     props: {
          list: Array,
          params: {},
     },
     methods: {
          redirectToSubmit() {
               this.$router.push({ name: "Submit", query: { redirect: "/" } });
          },
     },
     computed: {
          getQuestionsNumber() {
               return this.list.length;
          },
          getNumberOfQuestions() {
               const mapped = [];

               this.params.topics.forEach((topic) => {
                    let n = 0;
                    this.list.forEach((q) => {
                         if (q.topic === topic) n++;
                    });
                    mapped.push({ topic: topic, number: n });
               });

               return mapped;
          },
     },
};
</script>
