<template>
     <div class="bg-dark main pt-5">
          <Header />
          <NavBar :currentUser="this.user" />
          <router-view
               @updateUser="updateUser"
               :list="this.list"
               :params="this.params"
               :user="this.user"
          />
          <Footer />
     </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Question from "./models/Question";

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
               user: undefined,
          };
     },
     created: function() {
          Question.retrieveData({
               onSuccess: (data) => {
                    this.params.languages = data.languages;
                    this.params.topics = [...data.topics].sort((a, b) => a.localeCompare(b));
               },
          });

          Question.retrieveList({
               onSuccess: (list) => {
                    this.list = list;
                    this.$router.push({
                         name: "Submit",
                         query: { redirect: "/" },
                    });
               },
          });
     },
     methods: {
          updateUser(newUser) {
               this.user = newUser;
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
