<template>
     <div
          class="container border border-light d-flex flex-column col-md-6 cold-12 text-light rounded my-5 px-5 py-4"
     >
          <form>
               <div class="mb-4">
                    <h2>Login</h2>
                    <p>Login to access the control room</p>
               </div>

               <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input
                         type="text"
                         v-model="user"
                         class="form-control"
                         id="exampleInputEmail1"
                         aria-describedby="emailHelp"
                    />
               </div>
               <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input
                         v-model="password"
                         type="password"
                         class="form-control"
                         id="exampleInputPassword1"
                    />
               </div>
          </form>
          <button v-on:click="Login()" class="btn btn-success px-5 my-3 w-50 align-self-center">
               Login
          </button>
          <div
               class="alert alert-danger my-3 align-self-center"
               id="failed-login"
               role="alert"
          ></div>
     </div>
</template>

<script>
import db from "../Firebase";

export default {
     name: "Login",
     data() {
          return {
               user: "",
               password: "",
               role: "none",
          };
     },
     methods: {
          Redirect() {
               this.$router.push({ name: "Dashboard", query: { redirect: "/dashboard/" } });
          },
          Login() {
               if (this.user.trim().length < 4 || this.password.trim() < 4) {
                    this.ShowFailedLogin("Username/password is too short");
                    return;
               }

               this.HideFailedLogin();
               db.collection("users").onSnapshot((res) => {
                    const changes = res.docChanges();

                    changes.forEach((change) => {
                         if (change.type === "added") {
                              const data = change.doc.data();

                              try {
                                   if (data[this.user.trim()].password === this.password.trim()) {
                                        this.OnSuccess();
                                   } else {
                                        this.ShowFailedLogin(
                                             "There is no match for this combination in our database, please try again."
                                        );
                                   }
                              } catch (e) {
                                   console.log("Bad Combination");
                                   this.ShowFailedLogin(
                                        "There is no match for this combination in our database, please try again."
                                   );
                              }
                         }
                    });
               });
          },
          ShowFailedLogin(text) {
               const warning = document.getElementById("failed-login");
               warning.style.display = "inline";
               warning.innerHTML = text;
          },
          HideFailedLogin() {
               document.getElementById("failed-login").style.display = "none";
          },
          OnSuccess() {
               this.Redirect();
          },
     },
     created: function() {},
};
</script>

<style scoped>
#failed-login {
     display: none;
     margin-top: 5px;
     margin-bottom: 5px;
}
</style>
