<template>
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4 pb-4"
     >
          <h2 class="text-light mb-3 mt-1">{{ getEditMode }}</h2>
          <h3 class="fs-5">
               Editing as
               <span class="btn btn-success fst-italic">{{ this.user ? this.user : "Guest" }}</span>
          </h3>
          <div class="d-flex flex-column flex-md-row justify-content-center my-3">
               <button class="btn btn-primary m-1" @click="enterEdit(`LANGUAGE`)">
                    Languages
               </button>
               <button class="btn btn-primary m-1" @click="enterEdit(`TOPIC`)">Topics</button>
               <button class="btn btn-primary m-1" @click="enterEdit(`QUESTION`)">
                    Questions
               </button>
               <button class="btn btn-info m-1" @click="enterEdit(`NONE`)">
                    Close
               </button>
          </div>
          <div class="">
               <EditLanguages :params="getParams" v-if="edit === `LANGUAGE`" />
               <EditTopics :params="getParams" v-if="edit === `TOPIC`" />
               <SearchEdit :questions="getList" :params="getParams" v-if="edit === `QUESTION`" />
          </div>
     </div>
</template>

<script>
import SearchEdit from "../components/SearchEdit.vue";
import EditLanguages from "../components/EditLanguages.vue";
import EditTopics from "../components/EditTopics.vue";

export default {
     name: "Dashboard",
     components: { SearchEdit, EditLanguages, EditTopics },
     props: {
          user: String,
          list: Array,
          params: {},
     },
     data() {
          return {
               edit: "none",
          };
     },
     computed: {
          getList() {
               return this.list;
          },
          getParams() {
               return this.params;
          },
          cloneParams() {
               return JSON.parse(JSON.stringify(this.params));
          },
          getEditMode() {
               switch (this.edit) {
                    case "LANGUAGE":
                         return "Languages";
                    case "TOPIC":
                         return "Topics";
                    case "QUESTION":
                         return "Questions";
               }
               return "Dashboard";
          },
     },
     methods: {
          enterEdit(mode) {
               this.edit = mode;
          },
     },
     created() {
          if (this.user === undefined) {
               this.$router.push({
                    name: "Login",
                    query: { redirect: "/login" },
               });
          }
     },
};
</script>
