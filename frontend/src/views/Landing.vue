<template>
  <div class="flex flex-col align-centre bg-emerald-500">
    <h1 class="text-4xl mt-4">Welcome to Psyconymous!</h1>
    <img class="w-1/3 mx-auto" src="../assets/logo3.svg" />
    <router-link to="/chat" class="border-2 mx-auto w-15 rounded-lg px-2 py-1 bg-emerald-300"><span class="font-bold">Match with a counsellor now!</span></router-link>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Homescreen",
});
</script>
