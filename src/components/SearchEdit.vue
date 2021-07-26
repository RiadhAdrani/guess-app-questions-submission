<template>
     <div
          class="container col-12 p-1 flex-column justify-content-center search-view"
          id="search-view"
          v-if="!isEditMode"
     >
          <h3 class="text-light mb-1">Search for a question</h3>
          <button type="button" class="btn btn-dark">
               There are only
               <span class="badge bg-secondary mt-1 mx-1"> {{ list.length }} questions </span> in
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
                    <option value="20"> 20</option>
                    <option value="30"> 30</option>
               </select>
               <select
                    v-model="filterByTopic"
                    class="form-select d-none my-md-3 my-1 ml-md-1 ml-0 col-md-2 col-12 mb-md-3 mb-2"
                    aria-label="Default select example"
               >
                    <option value="All" key="all"> All</option>
                    <option v-for="t in topics" :key="t" v-bind:value="t"> {{ t }}</option>
               </select>
          </div>

          <div v-for="e in filteredList.slice(0, displayNumber)" :key="filteredList.indexOf(e)">
               <QuestionCardEdit
                    :question="e"
                    :onEdit="
                         function() {
                              EditQuestion(e.id);
                         }
                    "
               />
          </div>
     </div>

     <div class="edit-view text-light mb-5" id="edit-view" v-if="isEditMode">
          <EditQuestion
               :update="question"
               :languages="languages"
               :question="question"
               :topics="topics"
               @add="addAnswer"
               @remove="removeAnswer"
               @reset="resetAnswers"
               @cancel="cancel"
               @save="save"
               @delete="deleteQuestion"
          />
     </div>
</template>

<script>
import db from "../Firebase";
import QuestionCardEdit from "../components/basic-components/QuestionCardEdit.vue";
import EditQuestion from "../components/EditQuestion.vue";

export default {
     name: "SearchEdit",
     components: { QuestionCardEdit, EditQuestion },
     data() {
          return {
               list: [],
               filter: "",
               filterByTopic: "All",
               displayNumber: 5,
               topics: [],
               editMode: false,
               languages: [],
               eID: "",
               question: {
                    statement: "NA",
                    topic: "NA",
                    id: "NA",
                    answers: [
                         { answer: "NA", points: "NA" },
                         { answer: "NA", points: "NA" },
                    ],
               },
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

                         this.eID = this.list[0].id;
                    }
               });
          });

          db.collection("param").onSnapshot((snapshot) => {
               const changes = snapshot.docChanges();

               changes.forEach((change) => {
                    if (change.type === "added") {
                         const data = { ...change.doc.data() };

                         this.topics = [...data.topics].sort((a, b) => a.localeCompare(b));

                         this.languages = data.languages;
                    }
               });
          });
     },
     computed: {
          filteredList() {
               return this.list.filter((e) => {
                    return (
                         (e["statement"].toLowerCase().includes(this.filter.toLowerCase()) &&
                              (this.filterByTopic === "All" || e.topic === this.filterByTopic)) ||
                         !this.filter
                    );
               });
          },
          isEditMode() {
               return this.editMode;
          },
     },
     methods: {
          getQuestionIndexById(id) {
               for (let e in this.list) {
                    if (this.list[e].id === id) {
                         this.eID = id;
                         return e;
                    }
               }

               return -1;
          },
          EnterEditMode() {
               this.editMode = true;
          },
          ExitEditMode() {
               this.editMode = false;
               this.Redirect();
          },
          EditQuestion(id) {
               if (this.getQuestionIndexById(id) !== -1) {
                    const q = this.list[this.getQuestionIndexById(id)];
                    this.question = JSON.parse(JSON.stringify(q));
                    this.EnterEditMode();
               } else {
                    alert("An Error Occured...");
               }
          },
          removeAnswer: function() {
               if (this.question.answers.length > 10) {
                    this.question.answers.pop();
               }
          },
          addAnswer: function() {
               this.question.answers.push({ answer: "", points: 1 });
          },
          resetAnswers: function() {
               this.question.answers = [
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
                    { answer: "", points: 1 },
               ];
          },
          cancel() {
               this.ExitEditMode();
          },
          save() {
               db.collection("questions")
                    .doc(this.question.id)
                    .update({
                         ...this.question,
                    })
                    .then(() => {
                         this.ExitEditMode();
                         alert("Question Updated!");
                    });
          },
          deleteQuestion() {
               if (confirm("Are you sure you want to delete this question?"))
                    db.collection("questions")
                         .doc(this.question.id)
                         .delete()
                         .then(() => {
                              this.ExitEditMode();
                         })
                         .catch((e) => {
                              alert("Error deleting Question: ", e);
                         });
          },
          Redirect() {
               this.$router.push({ name: "Dashboard", query: { redirect: "/dashboard/" } });
          },
     },
};
</script>

<style scoped>
#search-view {
     overflow: hidden;
     display: auto;
}
#edit-view {
     width: 100%;
}
</style>
