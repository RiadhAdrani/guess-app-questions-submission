<template>
     <!--
     <Login v-if="!getUser" @admin="admin" />
     -->
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4 pb-4"
     >
          <h2 class="text-light mb-3 mt-1">{{ getEditMode }}</h2>
          <h3 class="fs-5">
               Editing as
               <span class="btn btn-success fst-italic">{{
                    currentUser ? currentUser : "Guest"
               }}</span>
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
// import Login from "./Login.vue"; Login
import SearchEdit from "../components/SearchEdit.vue";
import EditLanguages from "../components/EditLanguages.vue";
import EditTopics from "../components/EditTopics.vue";

export default {
     name: "Dashboard",
     components: { SearchEdit, EditLanguages, EditTopics },
     created() {
          console.log(this.currentUser);
          if (this.currentUser) return;
          const username = prompt("Enter username", "");
          const password = prompt(`Enter password for ${username}`, "");
          if (username === "top-admin" && password === "13061997Azerty") {
               this.currentUser = username;
               this.admin();
          } else {
               this.$router.push({
                    name: "Submit",
                    query: { redirect: "/" },
               });
          }
     },
     props: {
          user: String,
          list: Array,
          params: {},
     },
     data() {
          return {
               currentUser: undefined,
               edit: "none",
          };
     },
     computed: {
          getUser() {
               return this.user;
          },
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
          admin() {
               this.$emit("admin");
               console.log("emitted");
          },
     },
     emits: ["admin"],
};
</script>
