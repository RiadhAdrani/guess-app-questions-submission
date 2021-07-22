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
                    <option v-for="t in topics" :key="t" v-bind:value="t"> {{ t }}</option>
               </select>
          </div>
          <div class="m-5 d-flex flex-column flex-sm-row justify-content-center">
               <h3 class="text-light mr-sm-5">Language</h3>
               <select
                    v-model="question.language"
                    class="form-select p-2"
                    aria-label="Default select example"
               >
                    <option v-for="l in languages" :key="l" v-bind:value="l"> {{ l }}</option>
               </select>
          </div>

          <div class="form-floating d-flex flex-column justify-content-center mb-3">
               <h3 class="text-light">Answers</h3>
               <p class="text-light">At least 10 answers should be provided</p>
               <div
                    v-for="answer in question.answers"
                    :key="answer"
                    class="col-12 w-75 mb-md-2 mb-4 align-self-center d-flex flex-column flex-md-row"
               >
                    <input
                         type="text"
                         v-model="answer.answer"
                         class="form-control p-3 mb-2 mr-3 my-auto responsiveAnswer"
                         placeholder="Answer..."
                    />
                    <div class="d-flex flex-row my-auto px-0 col-md-4 col-12">
                         <p class="text-light my-auto ml-auto mr-2 ">Points:</p>
                         <select
                              v-model="answer.points"
                              class="form-select d-inline-flex"
                              aria-label="Default select example"
                         >
                              <option value="-5"> -5</option>
                              <option selected value="1"> 1</option>
                              <option value="2"> 2</option>
                              <option value="5"> 5</option>
                         </select>
                    </div>
               </div>
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
import db from "../Firebase";

export default {
     name: "Form",
     data() {
          return {
               warning: "",
               languages: [],
               submitting: false,
               topics: [],
               question: {
                    statement: "",
                    topic: "",
                    language: "",
                    answers: [
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
                    ],
               },
          };
     },
     methods: {
          removeAnswer() {
               if (this.question.answers.length > 10) {
                    this.question.answers.pop();
               }
          },
          addAnswer() {
               this.question.answers.push({ answer: "", points: 1 });
          },
          resetAnswers() {
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
          hideAlert() {
               document.getElementById("warning").style.display = "none";
          },
          showAlert() {
               document.getElementById("warning").style.display = "inline";
          },
          hideSuccess() {
               document.getElementById("success").style.display = "none";
          },
          showSuccess() {
               document.getElementById("success").style.display = "inline";
          },
          sendQuestion() {
               if (this.submitting) {
                    console.log("a request has already been sent, please wait !");
                    return;
               }

               this.hideAlert();
               this.hideSuccess();

               const q = this.$data.question;

               q.statement = q.statement.trim();

               for (let a = 0; a < q.answers.length; a++) {
                    q.answers[a].answer = q.answers[a].answer.trim();
               }

               if (!q.statement.trim()) {
                    this.warning = "Question is empty or too short!";
                    this.showAlert();
                    return;
               }

               const answers = q.answers;

               for (let x = 0; x < answers.length; x++) {
                    if (answers[x].answer.trim().length < 2) {
                         this.warning = "Answer cannot be empty or too short!";
                         this.showAlert();
                         return;
                    }

                    for (let y = 0; y < answers.length; y++) {
                         if (x !== y && answers[x].answer.trim() === answers[y].answer.trim()) {
                              this.warning = "Cannot have duplicate answers";
                              this.showAlert();
                              return;
                         }
                    }
               }

               const finalAnswers = [];
               for (let x = 0; x < answers.length; x++) {
                    finalAnswers.push({ answer: answers[x].answer, points: answers[x].points });
               }

               if (this.question.statement.trim().indexOf("10") === 0) {
                    this.question.statement = this.question.statement.trim().substr(2);
               }

               this.submitting = true;

               db.collection("questions")
                    .add(this.question)
                    .then(() => {
                         this.showSuccess();
                         this.submitting = false;
                         this.question = {
                              statement: "",
                              topic: this.question.topic,
                              language: this.question.language,
                              answers: [
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
                              ],
                         };
                    });
          },
     },
     created: function() {
          db.collection("param").onSnapshot((snapshot) => {
               const changes = snapshot.docChanges();

               changes.forEach((change) => {
                    if (change.type === "added") {
                         const data = { ...change.doc.data() };

                         this.topics = [...data.topics].sort((a, b) => a.localeCompare(b));
                         this.question.topic = this.topics[0];

                         this.languages = data.languages;
                         this.question.language = this.languages[0];
                    }
               });
          });
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
