<template>
     <div
          class="col-12 w-75 mb-md-2 mb-4 align-self-center d-flex flex-column flex-md-row"
          v-for="answer in answers"
          v-bind:key="answers.indexOf(answer)"
     >
          <input
               type="text"
               v-model="answer.answer"
               class="form-control p-3 mb-2 mr-3 my-auto responsiveAnswer"
               placeholder="Answer..."
          />
          <div class="d-flex flex-row my-auto px-0 col-md-4 col-12">
               <p class="text-light my-auto ml-auto mr-2 ">Points:</p>
               <select
                    v-model="answer.points"
                    class="form-select d-inline-flex"
                    aria-label="Default select example"
               >
                    <option value="-5"> -5</option>
                    <option selected value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="5"> 5</option>
               </select>
          </div>
     </div>
</template>

<script>
export default {
     name: "EditAnswer",
     props: {
          answers: Array,
     },
};
</script>

<style></style>
