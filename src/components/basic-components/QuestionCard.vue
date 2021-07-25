<template>
     <ul class="list-group">
          <li
               class="list-group-item mt-2 bg-secondary text-light d-flex flex-sm-row flex-column justify-content-between"
          >
               <p class="text-center text-sm-start my-auto">Name 10 {{ question.statement }}</p>
               <p class="d-flex flex-column flex-sm-row my-auto justify-content-end ml-2">
                    <span class="input-group-text w-100 bg-light text-dark m-1 align-self-center">{{
                         question.answers.length
                    }}</span
                    ><span
                         class="input-group-text w-100 bg-light text-dark m-1 align-self-center"
                         >{{ question.topic }}</span
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
     created() {
          console.log(this.question);
     },
};
</script>

<style></style>
