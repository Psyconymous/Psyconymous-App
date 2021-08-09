<template>
  <div class="grid grid-cols-12">
    <div class="mx-auto col-span-2">Sidebar Placeholder</div>
    <div class="grid grid-col-3 col-span-9 mb-4 ">
      <div v-if="users.length > 0" class=""> 
        <p class="text-2xl text-gray-500 opacity-60">Sweet, now you can chat with </p>
        <p class="text-4xl"><span class="text-gray-500">{{ users[0].userId }}</span> <span class="text-gray-500 opacity-60">!</span></p>
      </div>
      <div class="mt-4 ">
        <MessageBox class="flex" :class="message.from === socket.id ? 'flex-row-reverse' : ''" v-for="(message, index) in messages" :key="index" :previousMessage="index !== 0 ? messages[index-1] : undefined" :message="message" :first="index === 0">
        </MessageBox>
      </div>
    </div>
    <div class="mx-2 col-span-1">Extra sidebar Placeholder</div>
    <ChatInput
      :recipientId="users.length > 0 ? users[0].userId : 'sup'"
      class="col-span-8 col-start-3 mb-4"
      @sentMsg="onSentMsg"
    />
    <div>Placeholder</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ChatInput from "@/components/Chat/InputField.vue";
import MessageBox from "@/components/Chat/Message.vue";
import socket from "../socket";


export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
    MessageBox,
  },
  setup() {

    socket.connect();

    socket.on("connect", () =>
      console.log(`Current socket's socket id = ${socket.id}`)
    );
    socket.on("connect_error", () => {
      console.log("weird");
    });

    const users = ref([] as Array<any>);
    socket.emit("users");
    socket.on("users", (data) => {
      users.value = data.filter((user: any) => user.userId !== socket.id);
    });
    socket.on("user connected", (data) => {
      users.value.push(data);
    });

    const messages = ref([] as Array<any>);
    socket.on("private message", (data) => {
      // Will implement some logic to check if this is a correct recipient
      messages.value.push(data);
    });

    const onSentMsg = (message: any) => messages.value.push(message.message);

    onBeforeRouteLeave(() => {
      socket.offAny();
      socket.disconnect();
    });

    return { users, messages, socket, onSentMsg };
  },
});
</script>
