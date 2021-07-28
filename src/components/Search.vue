<template>
     <div class="container border border-light round p-5 d-flex flex-column justify-content-center">
          <h3 class="text-light mb-1">Search for a question</h3>
          <button type="button" class="btn btn-dark">
               There are only
               <span class="badge bg-secondary mt-1 mx-1"> {{ getList.length }} questions </span> in
               our Database !
          </button>

          <input
               type="search"
               class="form-control mt-3"
               placeholder="Search..."
               aria-label="Search"
               v-model="filter"
          />

          <div class="container mt-4">
               <QuestionCard
                    :question="e"
                    v-for="e in filteredList.slice(0, 5)"
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

               const final = [];
               for (let x = 0; x < this.displayNumber; x++) {
                    if (l.length < x) break;
                    else final.push(l[x]);
               }

               return l;
          },
     },
};
</script>
