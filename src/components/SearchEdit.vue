<template>
     <div
          class="container col-12 p-5 flex-column justify-content-center search-view"
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
               class="form-control mt-3"
               placeholder="Search..."
               aria-label="Search"
               v-model="filter"
          />

          <div class="container mt-4 col-12 col-md-10">
               <ul
                    class="list-group container border border-light pb-1 mb-4 col-12"
                    v-for="e in filteredList.slice(0, displayNumber)"
                    :key="e.statement"
               >
                    <div>
                         <li
                              class="bg-dark mx-auto py-3 px-4 text-light d-flex flex-lg-row flex-column justify-content-between"
                         >
                              <p
                                   class="text-center text-md-start my-auto d-flex flex-wrap flex-grow-1 fs-3"
                              >
                                   Name 10 {{ e.statement }}
                                   <span
                                        ><button
                                             class="btn btn-danger py-1 px-3 mx-md-3 mx-0"
                                             v-on:click="EditQuestion(e.id)"
                                        >
                                             Edit
                                        </button></span
                                   >
                              </p>
                         </li>
                    </div>
                    <p
                         class="d-flex flex-row flex-md-row flex-wrap my-auto justify-content-start justify-content-md-end ml-2"
                    >
                         <span
                              class="input-group-text bg-primary btn text-light m-1 align-self-center"
                              >{{ e.answers.length }}</span
                         ><span
                              class="input-group-text bg-primary btn text-light m-1 align-self-center"
                              >{{ e.topic }}</span
                         >
                         <span
                              class="input-group-text bg-primary btn text-light m-1 align-self-center text-break overflow-hidden"
                              >{{ e.id }}</span
                         >
                    </p>
                    <div class="d-flex flex-md-row flex-column flex-wrap bg-dark p-3">
                         <div
                              class="d-inline justify-content-start"
                              v-for="a in e.answers"
                              :key="a.answer"
                         >
                              <p
                                   class="list-group-item my-1 mx-1 rounded d-dm-inline-flex d-flex text-center justify-content-between flex-direction-row text-left"
                              >
                                   <span class="my-auto text-left">{{ a.answer }}</span>
                                   <span class="border border-dark p-1 px-2 ml-3 rounded">
                                        {{ a.points }}</span
                                   >
                              </p>
                         </div>
                    </div>
               </ul>
          </div>
     </div>

     <div class="edit-view text-light" id="edit-view">
          <div class="mt-4 col-12">
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
          </div>
          <div class="bg-secondary container rounded py-4">
               <div>
                    <li
                         class="mx-auto py-3 px-4 text-light d-flex flex-lg-row flex-column justify-content-between"
                    >
                         <p
                              class="text-center text-md-start my-auto d-flex flex-wrap flex-grow-1 fs-3"
                         >
                              Name 10 {{ question.statement }}
                         </p>

                         <button class="btn btn-success py-1 px-3 mx-md-3 my-2 mx-0">
                              Save
                         </button>
                         <button
                              class="btn btn-dark py-1 px-3 mx-md-3 my-2 mx-0"
                              v-on:click="ExitEditMode()"
                         >
                              Cancel
                         </button>
                    </li>
               </div>
               <p
                    class="d-flex flex-row flex-md-row flex-wrap my-auto justify-content-start justify-content-md-end ml-2"
               >
                    <span
                         class="input-group-text bg-primary btn text-light m-1 align-self-center"
                         >{{ question.topic }}</span
                    >
                    <span
                         class="input-group-text bg-primary btn text-light m-1 align-self-center"
                         >{{ question.answers.length }}</span
                    >
                    <span
                         class="input-group-text bg-primary btn text-light m-1 align-self-center text-break overflow-hidden"
                         >{{ question.id }}</span
                    >
               </p>
               <div class="d-flex flex-md-row flex-column flex-wrap p-3">
                    <div
                         class="d-inline justify-content-start"
                         v-for="a in question.answers"
                         :key="a.answer"
                    >
                         <p
                              class="list-group-item my-1 mx-1 rounded d-dm-inline-flex d-flex text-center justify-content-between flex-direction-row text-left"
                         >
                              <span class="my-auto text-left">{{ a.answer }}</span>
                              <span class="border border-dark p-1 px-2 ml-3 rounded">
                                   {{ a.points }}</span
                              >
                         </p>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import db from "../Firebase";

export default {
     name: "SearchEdit",
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
               console.log("executing");
               if (this.getQuestionIndexById(id) !== -1) {
                    const q = this.list[this.getQuestionIndexById(id)];

                    this.question = JSON.parse(JSON.stringify(q));

                    this.EnterEditMode();
               } else {
                    alert("An Error Occured...");
               }
          },
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
