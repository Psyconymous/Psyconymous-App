<template>
  <div class="grid grid-cols-8 grid-rows-6">
    <div class="mx-auto col-span-1 row-span-6">
      <p>{{ users }}</p>
    </div>
    <div class="col-span-6 row-span-5">
      <div
        class="object-left"
        v-for="(message, index) in messages"
        :key="index"
      >
        <p></p>
        <p>{{ message.from }} : {{ message.content }}</p>
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
import socket from "../socket";

const users = ref([] as Array<any>);
const messages = ref([] as Array<any>);

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
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
