<template>
     <div>
          <h3>Edit Languages</h3>
          <div class="col-12 py-2">
               <div
                    v-for="l in topics"
                    :key="topics.indexOf(l)"
                    class="bg-secondary my-1 py-2 px-4 d-flex flex-row justify-content-between rounded"
               >
                    <p class="my-auto">{{ l.language }}</p>
                    <div v-if="!l.locked" class="d-flex flex-row justify-content-end">
                         <input
                              v-if="l.edit"
                              v-model="topics[topics.indexOf(l)].language"
                              class="mr-2"
                         />
                         <button
                              v-if="!l.edit"
                              class="btn btn-danger"
                              @click="edit(topics.indexOf(l))"
                         >
                              Edit
                         </button>
                         <button v-if="l.edit" class="btn btn-primary mr-2" @click="save">
                              OK
                         </button>
                         <button
                              v-if="l.edit"
                              class="btn btn-warning"
                              @click="removeIt(l.language)"
                         >
                              Delete
                         </button>
                    </div>
               </div>
          </div>
          <button class="btn btn-success" @click="updateDB">Save</button>
     </div>
</template>

<script>
import db from "../models/Firebase";

export default {
     name: "EditLanguages",
     props: { params: Object },
     data() {
          return {
               topics: [],
          };
     },
     created() {
          this.topics = this.params.languages.map((l) => {
               return { language: l, edit: false, locked: l === "English" };
          });
          console.log(this.topics);
     },
     methods: {
          edit(index) {
               this.topics.forEach((e) => {
                    e.edit = false;
               });
               this.topics[index].edit = true;
          },
          save() {
               this.topics.forEach((e) => {
                    e.edit = false;
               });
          },
          removeIt(l) {
               this.topics = this.topics.filter((e) => e.language !== l);
          },
          updateDB() {
               const data = {
                    languages: this.topics.map((e) => e.language),
                    topics: [...this.params.topics],
               };

               db.collection("param")
                    .doc("params")
                    .update(data);
          },
     },
};
</script>

<style></style>
