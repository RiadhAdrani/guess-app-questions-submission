<template>
     <ul class="list-group">
          <li
               class="list-group-item mt-2 bg-secondary text-light d-flex flex-sm-row flex-column justify-content-between"
          >
               <p class="text-center text-sm-start my-auto">Name 10 {{ element.statement }}</p>
               <p class="d-flex flex-column flex-sm-row my-auto justify-content-end ml-2">
                    <span class="input-group-text w-100 bg-light text-dark m-1 align-self-center">{{
                         element.answers.length
                    }}</span
                    ><span
                         class="input-group-text w-100 bg-light text-dark m-1 align-self-center"
                         >{{ element.topic }}</span
                    >
               </p>
          </li>
     </ul>
</template>

<script>
export default {
     name: "QuestionCard",
     props: {
          question: Object,
     },
     data() {
          return {
               element: {},
          };
     },
     created() {
          this.element = this.question;
     },
};
</script>

<style></style>
