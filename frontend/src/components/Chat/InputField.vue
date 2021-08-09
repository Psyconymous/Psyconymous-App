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


export default defineComponent({
  name: "ChatInputField",
  props: {
    recipientId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const message = ref("");

    const sendMsg = (content: string) => {
      if(content !== "") {
        socket.emit("private message", {
          content,
          to: props.recipientId,
        });
        message.value = "";
        emit("sentMsg", { message: { content:content, from:socket.id } });
      }
    };
    return { message, sendMsg };
  },
});
</script>
