<template>
     <ul class="list-group mb-2">
          <li
               class="list-group-item py-1 px-3 bg-secondary text-light d-flex flex-sm-row flex-column justify-content-between flex-wrap"
          >
               <p class="text-center text-sm-start my-auto">Name 10 {{ cQuestion.statement }}</p>
               <p
                    class="d-flex flex-column flex-sm-row my-auto justify-content-end ml-2 text-center"
               >
                    <span class="input-group-text w-100 bg-light text-dark m-1 align-self-center">{{
                         cQuestion.answers.length
                    }}</span
                    ><span
                         class="input-group-text w-100 bg-light text-dark m-1 align-self-center"
                         >{{ cQuestion.topic }}</span
                    >
                    <span
                         v-on:click="onEdit"
                         class="fs-6 input-group-text w-100  text-light m-1 btn btn-danger align-self-center"
                         >Edit</span
                    >
               </p>
          </li>
     </ul>
</template>

<script>
export default {
     name: "QuestionCardEdit",
     props: {
          question: Object,
          onEdit: Function,
     },
     computed: {
          cQuestion() {
               return this.question;
          },
     },
};
</script>

<style></style>
