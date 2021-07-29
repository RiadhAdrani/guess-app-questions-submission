<template>
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4 pb-4"
     >
          <h1 class="text-light mb-2">About</h1>
          <p class="mt-2">
               We have nothing for you today, maybe try again later, or just help us with
               <span class="btn btn-success p-1" @click="redirectToSubmit">another question?</span>
          </p>
     </div>
</template>
<script>
export default {
     methods: {
          redirectToSubmit() {
               this.$router.push({ name: "Submit", query: { redirect: "/" } });
          },
     },
};
</script>
