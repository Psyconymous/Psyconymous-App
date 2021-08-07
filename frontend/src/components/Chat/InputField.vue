<template>
  <div class="flex">
    <input
      v-model="message"
      class="flex-grow rounded-lg border-2"
      @keyup.enter="sendMsg(message)"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import socket from "../../socket";

const message = ref("");

export default defineComponent({
  name: "ChatInputField",
  props: {
    recipientId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const sendMsg = (content: string) => {
      socket.emit("private message", {
        content,
        to: props.recipientId,
      });
      message.value = "";
    };
    return { message, sendMsg };
  },
});
</script>
