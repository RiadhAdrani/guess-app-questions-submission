<template>
     <div class="m-5 d-flex flex-column flex-sm-row justify-content-center">
          <h3 class="text-light mr-sm-5">{{ label }}</h3>
          <select
               v-model="currentValue"
               class="form-select p-2"
               aria-label="Default select example"
          >
               <option v-for="v in options" :key="v" v-bind:value="v"> {{ v }}</option>
          </select>
     </div>
</template>

<script>
export default {
     name: "Select",
     props: {
          label: String,
          options: Array,
          value: String,
     },
     data() {
          return {
               currentValue: this.value,
          };
     },
};
</script>

<style></style>
