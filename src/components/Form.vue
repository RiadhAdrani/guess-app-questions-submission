<template>
     <div class="container-sm mb-5 bg-dark p-5 border border-light rounded">
          <h3 class="text-light">Provide a valid question</h3>
          <p class="text-light">Question and answers should be in Selected Language</p>
          <div class="form-floating mt-5 mb-3">
               <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon3">Name 10</span>
                    <input
                         type="text"
                         v-model="question.statement"
                         maxlength="200"
                         class="form-control"
                         placeholder="things that you like."
                         aria-describedby="basic-addon3"
                    />
               </div>
          </div>
          <div class="m-5 d-flex flex-column flex-sm-row justify-content-center">
               <h3 class="text-light mr-sm-5">Topic</h3>
               <select
                    v-model="question.topic"
                    class="form-select p-2"
                    aria-label="Default select example"
               >
                    <option v-for="t in getTopics" :key="t" v-bind:value="t"> {{ t }}</option>
               </select>
          </div>
          <div class="m-5 d-flex flex-column flex-sm-row justify-content-center">
               <h3 class="text-light mr-sm-5">Language</h3>
               <select
                    v-model="question.language"
                    class="form-select p-2"
                    aria-label="Default select example"
               >
                    <option v-for="l in getLanguages" :key="l" v-bind:value="l"> {{ l }}</option>
               </select>
          </div>

          <div class="form-floating d-flex flex-column justify-content-center mb-3">
               <h3 class="text-light">Answers</h3>
               <p class="text-light">At least 10 answers should be provided</p>

               <EditAnswer :answers="question.answers" />

               <div class="d-flex flex-row justify-content-center">
                    <button
                         type="button"
                         class="btn btn-primary d-inline align-self-center px-4 m-2"
                         v-on:click="addAnswer()"
                    >
                         Add Answer
                    </button>
                    <button
                         type="button"
                         class="btn btn-warning d-inline align-self-center px-4 m-2"
                         v-on:click="removeAnswer()"
                    >
                         Remove Answer
                    </button>
               </div>

               <button
                    type="button"
                    class="btn btn-secondary d-inline align-self-center mt-2 px-5"
                    v-on:click="resetAnswers()"
               >
                    Reset Answers
               </button>
          </div>

          <p class="text-light">
               Before submitting, make sure that your question does not exist already in the
               database. <br />
               In The Future we will be adding a feature to detect similarity for submissions.
          </p>
          <div class="d-flex flex-column ">
               <button
                    class="btn btn-success d-inline align-self-center px-5"
                    id="send-btn"
                    v-on:click="sendQuestion()"
               >
                    Submit
               </button>
               <div class="alert alert-success mt-3 align-self-center" id="success" role="alert">
                    Question submitted successfully! Thank you for contributing!
               </div>
               <div class="alert alert-danger mt-3 align-self-center" id="warning" role="alert">
                    {{ warning }}
               </div>
          </div>
     </div>
</template>

<script>
import EditAnswer from "./basic-components/EditAnswers.vue";
import Question from "../models/Question";

export default {
     name: "Form",
     components: { EditAnswer },
     props: { list: Array, params: {} },
     computed: {
          getQuestions() {
               return this.list;
          },
          getTopics() {
               return this.params.topics;
          },
          getLanguages() {
               return this.params.languages;
          },
     },
     data() {
          return {
               warning: "",
               languages: [],
               submitting: false,
               topics: [],
               question: new Question({}),
          };
     },
     methods: {
          removeAnswer() {
               this.question.removeAnswer();
          },
          addAnswer() {
               this.question.addAnswer();
          },
          resetAnswers() {
               this.question.resetAnswers();
          },
          hideAlert() {
               document.getElementById("warning").style.display = "none";
          },
          showAlert(warning) {
               this.warning = warning;
               this.submitting = false;
               document.getElementById("warning").style.display = "inline";
          },
          hideSuccess() {
               document.getElementById("success").style.display = "none";
          },
          showSuccess() {
               document.getElementById("success").style.display = "inline";
          },
          sendQuestion() {
               if (this.submitting) return;

               this.hideAlert();
               this.hideSuccess();

               switch (this.question.verify(this.getQuestions)) {
                    case Question.DUPLICATE:
                         this.showAlert("Question Already exists!");
                         return;
                    case Question.SHORT_STATEMENT:
                         this.showAlert("Question is too short or empty!");
                         return;
                    case Question.SHORT_ANSWER:
                         this.showAlert("An answer is too short or empty!");
                         return;
                    case Question.DUPLICATE_ANSWER:
                         this.showAlert("No duplicate answers are allowed!");
                         return;
                    case Question.GOOD:
                         break;
               }

               this.question.prepare();

               this.question.submit({
                    onSuccess: () => {
                         this.question.resetAnswers();
                         this.question.resetStatement();
                         this.hideAlert();
                         this.showSuccess();
                         this.submitting = false;
                    },
                    onFailure: (e) => {
                         alert("Something wrong happened: ", e);
                         this.question.resetAnswers();
                         this.question.resetStatement();
                         this.submitting = false;
                    },
               });
          },
     },
};
</script>

<style>
#warning {
     display: none;
}

#success {
     display: none;
}
</style>
