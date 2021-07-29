<template>
  <div class="flex">
    <input
      v-model="message"
      class="flex-grow rounded-lg border-2"
      @keyup.enter="sendMsg"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";

const message = ref("");

/* Will change this to a POST request to the server socket when it is implemented */
function sendMsg() {
  console.log(`I sent ${message.value}`);
}
export default defineComponent({
  name: "ChatInputField",
  setup() {
    return { message, sendMsg };
  },
});
</script>
