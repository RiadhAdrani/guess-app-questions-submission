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
                         autocomplete="your-current-password"
                         class="form-control"
                         id="exampleInputPassword1"
                    />
               </div>
          </form>
          <span class="fst-italic">Disconnect by simply exiting this tab.</span>
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

               if (this.user.trim() === "top-admin" && this.password.trim() === "13061997Azerty") {
                    this.$emit("admin");
                    this.$router.push("/dashboard");
                    return;
               }

               this.$emit("login", { username: this.user, password: this.password });
          },
          ShowFailedLogin(text) {
               const warning = document.getElementById("failed-login");
               warning.style.display = "inline";
               warning.innerHTML = text;
          },
          HideFailedLogin() {
               document.getElementById("failed-login").style.display = "none";
          },
     },
     props: {
          currentUser: String,
     },
     computed: {
          getUser() {
               if (this.currentUser) {
                    // this.Redirect();
               }
               return this.currentUser;
          },
     },
     emits: ["login", "admin"],
};
</script>

<style scoped>
#failed-login {
     display: none;
     margin-top: 5px;
     margin-bottom: 5px;
}
</style>
