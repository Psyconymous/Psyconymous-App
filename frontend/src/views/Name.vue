<template>
  <div
    class="h-screen flex flex-col overflow-y-hidden bg-emerald-500 container"
  >
    <div class="my-auto">
      <h1>Input Your Name!</h1>
      <input class="my-auto mx-auto px-2" @keydown.enter="registerName()" placeholder="your name" v-model="name" type="text">  
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const name = ref("");
    /* TODO: Allow users to generate random usernames for themselves */
    const registerName = () => { 
      if(name.value !== "") {
        window.localStorage.setItem('name', name.value);
      }
      name.value = ""
    };
    return { name, registerName }
  },
})
</script>

