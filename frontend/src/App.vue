<template>
  <div class="h-full flex">
    <div id="nav" class="w-1/12 bg-gray-500 col-span-1 sticky top-0">
      <div class="border-2"><router-link to="/">Home</router-link></div>
      <div class="border-2"><router-link to="/chat">Chat</router-link></div>
    </div>
    <router-view class="w-5/6 "/>
    <div class="bg-gray-500">Extra sidebar Placeholder</div>
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
