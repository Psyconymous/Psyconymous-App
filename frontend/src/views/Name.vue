<template>
  <div
    class="h-screen flex flex-col overflow-y-hidden bg-emerald-500 container"
  >
    <div class="my-auto">
      <h1>Input Your Name!</h1>
      <div class="">
        <input
          class="my-auto mx-auto px-2 rounded"
          @keydown.enter="registerName()"
          placeholder="your name"
          v-model="username"
          type="text"
        />
        <button
          class="m-2 p-2 rounded border bg-emerald-300"
          @click="generateName"
        >
          Generate One For Me!
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as adjectivesAndNames from "../assets/adjectivesAndNouns.json";

export default defineComponent({
  setup() {
    /* Redirect Stuff */
    const currentRoute = useRoute();
    const router = useRouter();
    const hasRedirectPath =
      currentRoute.params.next !== undefined && currentRoute.params.next !== "";

    const username = ref("");
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

    // generate a random name from a random adjective and noun found in adjectivesAndNouns.json
    const generateName = () => {
      // @ronald Does the - 1 - 0 + 1 +0 even do anything???? seems kinda useless
      let random1: number = Math.floor(
        Math.random() * (adjectivesAndNames.adjectives.length - 1 - 0 + 1) + 0
      );
      let random2: number = Math.floor(
        Math.random() * (adjectivesAndNames.nouns.length - 1 - 0 + 1) + 0
      );
      username.value =
        adjectivesAndNames.adjectives[random1] +
        " " +
        adjectivesAndNames.nouns[random2];
      return;
    };

    return { username, registerName, generateName };
  },
});
</script>
