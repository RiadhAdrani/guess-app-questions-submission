<template>
     <div>
          <div class="col-12 py-2">
               <div
                    v-for="l in topics"
                    :key="topics.indexOf(l)"
                    class="bg-secondary my-1 py-2 px-4 d-flex flex-row justify-content-between rounded"
               >
                    <p class="my-auto">{{ l.topic }}</p>
                    <div class="d-flex flex-row justify-content-end">
                         <input
                              v-if="l.edit"
                              v-model="topics[topics.indexOf(l)].topic"
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
                         <button v-if="l.edit" class="btn btn-warning" @click="removeIt(l.topic)">
                              Delete
                         </button>
                    </div>
               </div>
          </div>
          <button class="btn btn-primary mr-1" @click="add">Add</button>
          <button class="btn btn-success" @click="updateDB">Save</button>
     </div>
</template>

<script>
import db from "../models/Firebase";

export default {
     name: "EditTopics",
     props: { params: Object },
     data() {
          return {
               topics: [],
          };
     },
     created() {
          this.topics = this.params.topics.map((l) => {
               return { topic: l, edit: false };
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
               if (confirm("Are you sure you want to delete this topic?")) {
                    if (confirm("Are you really sure you want to proceed?")) {
                         this.topics = this.topics.filter((e) => e.topic !== l);
                    }
               }
          },
          updateDB() {
               for (let i = 0; i < this.topics.length; i++) {
                    for (let j = 0; j < this.topics.length; j++) {
                         if (
                              this.topics[i].topic.trim().toLowerCase() ===
                                   this.topics[j].topic.trim().toLowerCase() &&
                              i !== j
                         ) {
                              alert(
                                   `Duplicate entries: ${this.topics[i].topic} and ${this.topics[j].topic}`
                              );
                              return;
                         }
                    }
               }

               const data = {
                    topics: this.topics.map((e) => e.topic.trim()),
                    languages: [...this.params.languages],
               };

               db.collection("param")
                    .doc("params")
                    .update(data)
                    .then(() => {
                         alert("Database updated successfully!");
                    });
          },
          add() {
               this.topics.forEach((e) => {
                    e.edit = false;
               });
               this.topics.push({ topic: "New", edit: true });
          },
     },
};
</script>

<style></style>
