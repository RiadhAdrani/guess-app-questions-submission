<template>
     <div
          class="container col-12 p-1 flex-column justify-content-center search-view"
          id="search-view"
          v-if="!isEditMode"
     >
          <button type="button" class="btn btn-dark">
               There are only
               <span class="badge bg-secondary mt-1 mx-1">
                    {{ getQuestions.length }} questions
               </span>
               in our Database !
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
               <select
                    v-model="filterByTopic"
                    class="form-select d-none my-md-3 my-1 ml-md-1 ml-0 col-md-2 col-12 mb-md-3 mb-2"
                    aria-label="Default select example"
               >
                    <option value="All" key="all"> All</option>
                    <option v-for="t in getTopics" :key="t" v-bind:value="t"> {{ t }}</option>
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
               :languages="getLanguages"
               :question="question"
               :topics="getTopics"
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
import QuestionCardEdit from "../components/basic-components/QuestionCardEdit.vue";
import EditQuestion from "../components/EditQuestion.vue";
import Question from "../models/Question";

export default {
     name: "SearchEdit",
     components: { QuestionCardEdit, EditQuestion },
     data() {
          return {
               filter: "",
               filterByTopic: "All",
               displayNumber: 5,
               editMode: false,
               question: new Question({}),
          };
     },
     props: {
          questions: Array,
          params: {},
     },
     computed: {
          getLanguages() {
               return this.params.languages;
          },
          getTopics() {
               return this.params.topics;
          },
          getQuestions() {
               return this.questions;
          },
          filteredList() {
               return this.questions.filter((e) => {
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
               for (let e in this.getQuestions) {
                    if (this.getQuestions[e].id === id) {
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
                    this.question = Question.fromJSON(
                         this.getQuestions[this.getQuestionIndexById(id)]
                    );
                    this.EnterEditMode();
               } else {
                    alert("An Error Occured...");
               }
          },
          removeAnswer: function() {
               this.question.removeAnswer();
          },
          addAnswer: function() {
               this.question.addAnswer();
          },
          resetAnswers: function() {
               this.question.resetAnswers;
          },
          cancel() {
               this.ExitEditMode();
          },
          save() {
               this.question.updateLastModified();
               this.question.onVerify({
                    list: this.questions,
                    onDuplicateQuestion: () => {
                         alert("No duplicate question allowed");
                    },
                    onShortQuestionStatement: () => {
                         alert("Question is too short or empty! (3 characters min)");
                    },
                    onShortAnswer: () => {
                         alert("A short or empty is not allowed! (2 characters min)");
                    },
                    onDuplicateAnswer: () => {
                         alert("Duplicate answer detected!");
                    },
                    onValidSubmission: () => {
                         this.question.save({
                              onSuccess: () => {
                                   this.ExitEditMode();
                                   alert("Question Updated!");
                              },
                              onFailure: (e) => {
                                   alert("Error saving updates: ", e);
                              },
                         });
                    },
               });
          },
          deleteQuestion() {
               if (confirm("Are you sure you want to delete this question?")) {
                    if (confirm("Are you really sure you want to do this?")) {
                         this.question.wipe({
                              onSuccess: () => {
                                   this.ExitEditMode();
                              },
                              onFailure: (e) => {
                                   alert("Error deleting Question: ", e);
                              },
                         });
                    }
               }
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
