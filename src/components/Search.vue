<template>
     <div class="container border border-light round p-5 d-flex flex-column justify-content-center">
          <h3 class="text-light mb-4">Search for a question</h3>
          <input
               type="search"
               class="form-control"
               placeholder="Search..."
               aria-label="Search"
               v-model="filter"
          />

          <div class="container mt-4">
               <ul class="list-group" v-for="e in filteredList" :key="e.statement">
                    <li
                         class="list-group-item mt-2 bg-secondary text-light d-flex flex-sm-row flex-column justify-content-between"
                    >
                         <p class="text-center text-sm-start my-auto">Name 10 {{ e.statement }}</p>
                         <p class="d-flex flex-column flex-sm-row my-auto justify-content-end ml-2">
                              <span
                                   class="input-group-text w-100 bg-light text-dark m-1 align-self-center"
                                   >{{ e.answers.length }}</span
                              ><span
                                   class="input-group-text w-100 bg-light text-dark m-1 align-self-center"
                                   >{{ e.topic }}</span
                              >
                         </p>
                    </li>
               </ul>
          </div>
     </div>
</template>

<script>
import db from "../Firebase";

export default {
     name: "Search",
     data() {
          return {
               list: [],
               filter: "",
          };
     },
     created: function() {
          db.collection("questions").onSnapshot((res) => {
               const changes = res.docChanges();

               changes.forEach((change) => {
                    if (change.type === "added") {
                         this.list.push({
                              ...change.doc.data(),
                              id: change.doc.id,
                         });
                    }
               });
          });
     },
     computed: {
          filteredList() {
               if (!this.filter) {
                    return this.list;
               }
               const l = [];
               this.list.forEach((e) => {
                    if (e["statement"].toLowerCase().includes(this.filter.toLowerCase())) l.push(e);
               });

               return l.slice(0, 2);
          },
     },
};
</script>
