<template>
     <div class="mt-4 col-12">
          <div class="d-inline-flex flex-md-row flex-column">
               <span
                    class="input-group-text bg-primary btn text-light m-1 align-self-center text-break overflow-hidden"
                    >Editing : {{ update.id }}</span
               >
               <button class="btn btn-success py-1 px-3 mx-md-3 my-2 mx-0" @click="save">
                    Save
               </button>
               <button class="btn btn-danger py-1 px-3 mx-md-3 my-2 mx-0" @click="del">
                    Delete
               </button>
               <button class="btn btn-secondary py-1 px-3 mx-md-3 my-2 mx-0" @click="cancel">
                    Cancel
               </button>
          </div>

          <div class="mt-4 col-12">
               <div class="form-floating mt-5 mb-3">
                    <div class="input-group mb-3">
                         <span class="input-group-text" id="basic-addon3">Name 10</span>
                         <input
                              type="text"
                              v-model="update.statement"
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
                         v-model="update.topic"
                         class="form-select p-2"
                         aria-label="Default select example"
                    >
                         <option v-for="t in getTopics" :key="t" v-bind:value="t"> {{ t }}</option>
                    </select>
               </div>
               <div class="m-5 d-flex flex-column flex-sm-row justify-content-center">
                    <h3 class="text-light mr-sm-5">Language</h3>
                    <select
                         v-model="update.language"
                         class="form-select p-2"
                         aria-label="Default select example"
                    >
                         <option v-for="l in getLanguages" :key="l" v-bind:value="l">
                              {{ l }}</option
                         >
                    </select>
               </div>
               <div class="form-floating d-flex flex-column justify-content-center mb-3">
                    <EditAnswers :answers="update.answers" />
               </div>
          </div>
          <div class="d-flex flex-row justify-content-center">
               <button
                    type="button"
                    class="btn btn-primary d-inline align-self-center px-4 m-2"
                    @click="add"
               >
                    Add Answer
               </button>
               <button
                    type="button"
                    class="btn btn-warning d-inline align-self-center px-4 m-2"
                    @click="remove"
               >
                    Remove Answer
               </button>
               <button
                    type="button"
                    class="btn btn-secondary d-inline align-self-center m-2 px-5"
                    @click="reset"
               >
                    Reset Answers
               </button>
          </div>
     </div>
</template>

<script>
import EditAnswers from "../components/basic-components/EditAnswers.vue";
import Question from "../models/Question";

export default {
     name: "QuestionCardEdit",
     components: { EditAnswers },
     props: {
          question: Question,
          languages: Array,
          topics: Array,
     },
     created() {
          this.q = this.question;
     },
     computed: {
          update() {
               return this.question;
          },
          getLanguages() {
               return this.languages;
          },
          getTopics() {
               return this.topics;
          },
     },
     methods: {
          add() {
               this.$emit("add");
          },
          remove() {
               this.$emit("remove");
          },
          reset() {
               this.$emit("reset");
          },
          save() {
               this.$emit("save");
          },
          cancel() {
               this.$emit("cancel");
          },
          del() {
               this.$emit("delete");
          },
     },

     emits: ["add", "remove", "reset", "save", "cancel", "delete"],
};
</script>

<style></style>
