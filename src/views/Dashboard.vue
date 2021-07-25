<template>
     <div
          class="container border border-light d-flex flex-column col-md-10 col-12 text-light rounded mt-5 px-5 pt-4"
     >
          <h2 class="text-light">Dashboard</h2>
          <div class="">
               <SearchEdit />
          </div>
     </div>
</template>

<script>
import SearchEdit from "../components/SearchEdit.vue";

export default {
     name: "Dashboard",
     components: { SearchEdit },
};
</script>
