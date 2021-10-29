<template>
  <div
    class="h-screen flex flex-col overflow-y-hidden bg-emerald-500 container"
  >
    <div class="my-auto">
      <h1>Input Your Name!</h1>
      <input
        class="my-auto mx-auto px-2"
        @keydown.enter="registerName()"
        placeholder="your name"
        v-model="username"
        type="text"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    /* Redirect Stuff */
    const currentRoute = useRoute();
    const router = useRouter();
    const hasRedirectPath =
      currentRoute.params.next !== undefined && currentRoute.params.next !== "";

    const username = ref("");
    /* TODO: Allow users to generate random usernames for themselves */
    const registerName = () => {
      if (username.value !== "") {
        window.localStorage.setItem("name", username.value);

        /*
            Redirect to the chat page once you are
            done setting the username
            given that the user was redirected
            from the Chat page
        */
        if (hasRedirectPath) {
          router.push("/chat");
        }
      }
      username.value = "";
    };
    return { username, registerName };
  },
});
</script>
