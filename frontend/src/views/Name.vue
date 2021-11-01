<template>
  <div
    class="flex flex-col align-start justify-center overflow-y-hidden bg-emerald-500 container"
  >
      <h1>Input Your Name!</h1>
      <div class="flex justify-center">
        <input
          class="my-2 px-2 rounded"
          @keydown.enter="registerName()"
          placeholder="your name"
          v-model="username"
          type="text"
        />
        <button
          class="my-2 mx-1 p-1 rounded border bg-emerald-300"
          @click="generateName"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="20" height="20"
            viewBox="0 0 30 30"
            style=" fill:#000000;"
            :class="{'refresh-start': generatingName}"
        >
            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
        </svg>
        </button>
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
    const generatingName = ref(false);
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
      generatingName.value = false;
      generatingName.value = true;
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
      setTimeout(() => generatingName.value = false, 500);
      return;
    };

    return { username, registerName, generateName, generatingName };
  },
});
</script>
<style>

@keyframes rotate {

from {transform: rotate(0deg)}
to {transform: rotate(360deg)}

}

.refresh-start {

animation-name: rotate;
animation-duration: 0.5s;
animation-iteration-count: infinite;
animation-timing-function: linear;
animation-play-state: running;

}
</style>
