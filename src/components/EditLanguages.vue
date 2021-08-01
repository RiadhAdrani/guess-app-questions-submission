<template>
     <div>
          <div class="col-12 py-2">
               <div
                    v-for="l in languages"
                    :key="languages.indexOf(l)"
                    class="bg-secondary my-1 py-2 px-4 d-flex flex-md-row flex-wrap flex-column justify-content-between rounded"
               >
                    <p class="my-auto">{{ l.language }}</p>
                    <div
                         class="d-flex flex-row justify-content-md-end justify-content-center mt-md-0 mt-2"
                    >
                         <input
                              v-if="l.edit"
                              v-model="languages[languages.indexOf(l)].language"
                              class="mr-2"
                         />
                         <button
                              v-if="!l.edit && !l.locked"
                              class="btn btn-danger"
                              @click="edit(languages.indexOf(l))"
                         >
                              Edit
                         </button>
                         <button v-if="l.locked" class="btn btn-info">
                              Basic
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
          <button class="btn btn-primary mr-1" @click="add">Add</button>
          <button class="btn btn-success ml-1" @click="updateDB">Save</button>
     </div>
</template>

<script>
import db from "../models/Firebase";

export default {
     name: "EditLanguages",
     props: { params: Object },
     data() {
          return {
               languages: [],
          };
     },
     created() {
          this.languages = this.params.languages.map((l) => {
               return { language: l, edit: false, locked: l === "English" };
          });
     },
     methods: {
          edit(index) {
               this.languages.forEach((e) => {
                    e.edit = false;
               });
               this.languages[index].edit = true;
          },
          save() {
               this.languages.forEach((e) => {
                    e.edit = false;
               });
          },
          removeIt(l) {
               if (confirm("Are you sure you want to delete this langauge?")) {
                    if (confirm("Are you really sure you want to proceed?")) {
                         this.languages = this.languages.filter((e) => e.language !== l);
                    }
               }
          },
          updateDB() {
               for (let i = 0; i < this.languages.length; i++) {
                    for (let j = 0; j < this.languages.length; j++) {
                         console.log(this.languages[i].language, this.languages[j].language);
                         if (
                              this.languages[i].language.trim().toLowerCase() ===
                                   this.languages[j].language.trim().toLowerCase() &&
                              i !== j
                         ) {
                              alert(
                                   `Duplicate entries: ${this.languages[i].language} at index ${i} and ${this.languages[j].language} at index ${j}`
                              );
                              return;
                         }
                    }
               }

               const data = {
                    languages: this.languages.map((e) => e.language.trim()),
                    topics: [...this.params.topics],
               };

               db.collection("param")
                    .doc("params")
                    .update(data)
                    .then(() => {
                         alert("Database updated successfully!");
                    });
          },
          add() {
               this.languages.forEach((e) => {
                    e.edit = false;
               });
               this.languages.push({ language: "New", edit: true, locked: false });
          },
     },
};
</script>

<style></style>
