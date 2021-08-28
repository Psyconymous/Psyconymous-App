<template>
  <div class="h-screen">
    <h1 class="text-4xl">Welcome !</h1>
    <router-link to="/chat">Chat</router-link>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Homescreen",
})

</script>


