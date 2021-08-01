<template>
     <div class="container border border-light round p-5 d-flex flex-column justify-content-center">
          <h3 class="text-light mb-1">Search for a question</h3>
          <button type="button" class="btn btn-dark">
               There are only
               <span class="badge bg-secondary mt-1 mx-1"> {{ getList.length }} questions </span> in
               our Database !
          </button>

          <div class="d-flex flex-md-row flex-column">
               <input
                    type="search"
                    class="form-control mt-3 mb-md-3 mb-1"
                    placeholder="Search..."
                    aria-label="Search"
                    v-model="filter"
               />
               <select
                    v-model="displayNumber"
                    class="form-select d-inline-flex my-md-3 my-1 ml-md-1 ml-0 col-md-2 col-12"
                    aria-label="Default select example"
               >
                    <option selected value="5"> 5</option>
                    <option value="10"> 10</option>
                    <option value="25"> 25</option>
                    <option value="50"> 50</option>
                    <option value="100"> 100</option>
               </select>
          </div>

          <div class="container mt-4">
               <QuestionCard
                    :question="e"
                    v-for="e in filteredList.slice(0, displayNumber)"
                    :key="e.statement"
               />
          </div>
     </div>
</template>

<script>
import QuestionCard from "../components/basic-components/QuestionCard.vue";

export default {
     name: "Search",
     components: { QuestionCard },
     props: {
          questions: Array,
     },
     data() {
          return {
               list: [],
               filter: "",
               displayNumber: 5,
          };
     },
     computed: {
          getList() {
               return this.questions;
          },
          filteredList() {
               if (!this.filter) {
                    return this.questions;
               }
               const l = [];
               this.questions.forEach((e) => {
                    if (e["statement"].toLowerCase().includes(this.filter.toLowerCase())) l.push(e);
               });

               return l;
          },
     },
};
</script>
