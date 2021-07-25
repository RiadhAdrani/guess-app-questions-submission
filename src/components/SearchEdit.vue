<template>
     <div
          class="container col-12 p-1 flex-column justify-content-center search-view"
          id="search-view"
     >
          <h3 class="text-light mb-1">Search for a question</h3>
          <button type="button" class="btn btn-dark">
               There are only
               <span class="badge bg-secondary mt-1 mx-1"> {{ list.length }} questions </span> in
               our Database !
          </button>

          <input
               type="search"
               class="form-control mt-3 mb-3"
               placeholder="Search..."
               aria-label="Search"
               v-model="filter"
          />
          <QuestionCardEdit
               :question="e"
               :onEdit="
                    function() {
                         EditQuestion(e.id);
                    }
               "
               v-for="e in filteredList"
               :key="filteredList.indexOf(e)"
          />
     </div>

     <div class="edit-view text-light mb-5" id="edit-view">
          <EditQuestion
               :update="question"
               :languages="languages"
               :question="question"
               :topics="topics"
               @add="addAnswer"
               @remove="removeAnswer"
               @reset="resetAnswers"
               @cancel="cancel"
          />
     </div>
</template>

<script>
import db from "../Firebase";
import QuestionCardEdit from "../components/basic-components/QuestionCardEdit.vue";
import EditQuestion from "../components/EditQuestion.vue";

export default {
     name: "SearchEdit",
     components: { QuestionCardEdit: QuestionCardEdit, EditQuestion: EditQuestion },
     data() {
          return {
               list: [],
               filter: "",
               displayNumber: 5,
               topics: [],
               languages: [],
               eID: "",
               question: {
                    statement: "question",
                    topic: "topic",
                    id: "id lol",
                    answers: [
                         { answer: "Answer", points: "1" },
                         { answer: "Answer 2", points: "-5" },
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
               if (!this.filter) {
                    return this.list;
               }
               const l = [];
               this.list.forEach((e) => {
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
               document.getElementById("search-view").style.display = "none";
               document.getElementById("edit-view").style.display = "inline-block";
          },
          ExitEditMode() {
               document.getElementById("search-view").style.display = "flex";
               document.getElementById("edit-view").style.display = "none";
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
               console.log("Added");
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
     display: none;
}
</style>
