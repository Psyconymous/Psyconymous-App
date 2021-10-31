<template>
  <div class="flex">
    <input
      v-model="message"
      class="flex-grow rounded-lg border-2 p-2 break-all"
      @keyup.enter="sendMsg(message)"
      placeholder="send the fcking mesasge"
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
    let username = localStorage.getItem("name");
    const message = ref("");

    const sendMsg = (content: string) => {
      if (content !== "") {
        console.log(content);
        socket.emit("private message", {
          content,
          username, 
          to: props.recipientId,
        });
        message.value = "";
        emit("sentMsg", { message: { content: content, from: socket.id } });
      }
    };
    return { message, sendMsg };
  },
});
</script>
