<template>
     <div class="bg-dark main pt-5">
          <Header />
          <NavBar :currentUser="this.user" />
          <router-view @login="login" :list="this.list" :params="this.params" :user="this.user" />
          <Footer />
     </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Utils from "./models/Util";

export default {
     name: "App",
     components: { NavBar, Header, Footer },
     computed: {
          getParams() {
               return this.params;
          },
          getList() {
               return this.list;
          },
          getUser() {
               return this.user;
          },
     },
     data() {
          return {
               list: [],
               params: {
                    languages: [],
                    topics: [],
               },
               users: [],
               user: undefined,
          };
     },
     created: function() {
          Utils.getParams({
               onSuccess: (data) => {
                    this.params.languages = data.languages;
                    this.params.topics = [...data.topics].sort((a, b) => a.localeCompare(b));
               },
          });

          Utils.getQuestionsList({
               onSuccess: (list) => {
                    this.list = list;
                    this.$router.push({
                         name: "Submit",
                         query: { redirect: "/" },
                    });
               },
          });

          Utils.getUsers({
               onSuccess: (data) => {
                    this.users = data;
               },
          });
     },
     methods: {
          login(combination) {
               if (this.users[combination.username]) {
                    if (this.users[combination.username].password === combination.password) {
                         this.user = combination.username;
                         this.$router.push({
                              name: "Dashboard",
                              query: { redirect: "/dashboard/" },
                         });
                    } else {
                         alert("Bad combination");
                    }
               } else {
                    alert("Bad combination");
               }
          },
     },
};
</script>

<style>
.circular-img {
     border-radius: 50%;
     max-width: 150px;
}

.html {
     padding-top: 0%;
}

#app {
     font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial,
          sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     background-color: #2c3e50;
}
</style>
