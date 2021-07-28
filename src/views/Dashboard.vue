<template>
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4 pb-4"
     >
          <h2 class="text-light">Dashboard</h2>
          <div class="">
               <EditLanguages :params="getParams" />
               <SearchEdit :questions="getList" :params="getParams" />
          </div>
     </div>
</template>

<script>
import SearchEdit from "../components/SearchEdit.vue";
import EditLanguages from "../components/EditLanguages.vue";

export default {
     name: "Dashboard",
     components: { SearchEdit, EditLanguages },
     props: {
          user: String,
          list: Array,
          params: {},
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
     },
     created() {
          /*
          if (this.user === undefined) {
               this.$router.push({
                    name: "Login",
                    query: { redirect: "/login" },
               });
          }*/
     },
};
</script>
