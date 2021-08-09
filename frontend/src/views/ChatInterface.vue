<template>
  <div class="grid grid-cols-8 grid-rows-6">
    <div class="mx-auto col-span-1 row-span-6">
    </div>
    <div class="col-span-6 row-span-5">
      <div
        class="flex"
        v-for="(message, index) in messages"
        :key="index"
      >
        <MessageBox :message="message"/>
      </div>
    </div>
    <div class="mx-2 col-span-1 row-span-6">Extra sidebar Placeholder</div>
    <ChatInput
      :recipientId="users.length > 0 ? users[0].userId : 'sup'"
      class="col-span-6 bg-red-500"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ChatInput from "@/components/Chat/InputField.vue";
import MessageBox from "@/components/Chat/Message.vue";
import socket from "../socket";

const users = ref([] as Array<any>);
const messages = ref([] as Array<any>);

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
    MessageBox
  },
  setup() {
    socket.connect();

    socket.on("connect", () =>
      console.log(`Current socket's socket id = ${socket.id}`)
    );
    socket.on("connect_error", () => {
      console.log("weird");
    });

    socket.emit("users");
    socket.on("users", (data) => {
      users.value = data.filter((user: any) => user.userId !== socket.id);
    });
    socket.on("user connected", (data) => {
      users.value.push(data);
    });

    socket.on("private message", (data) => {
      // Will implement some logic to check if this is a correct recipient
      messages.value.push(data);
    });

    onBeforeRouteLeave(() => {
      socket.offAny();
      socket.disconnect();
    });

    return { users, messages, socket };
  },
});
</script>
