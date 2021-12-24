<template>
  <div class="h-screen flex">
    <div id="nav" class="w-1/6 bg-gray-500 col-span-1 sticky top-0">
      <div class="border-4 border-b-0 rounded-t-lg p-2">
        <router-link to="/">Home</router-link>
      </div>
      <div class="border-4 p-2"><router-link to="/chat">Chat</router-link></div>
      <div class="border-4 border-t-0 p-2">
        <router-link
          to="/name"
          :class="{ 'router-link-exact-active': route.name === 'Name' }"
          >Name</router-link
        >
      </div>
    </div>
    <div class="w-full flex flex-row-reverse">
      <img
        src="./assets/logo3.svg"
        class="absolute opacity-50 w-[5%] h-[5%]"
        alt
      />
      <router-view class="w-full h-full" />
    </div>
    <div class="w-1/12 bg-gray-500">Extra sidebar Placeholder</div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>
