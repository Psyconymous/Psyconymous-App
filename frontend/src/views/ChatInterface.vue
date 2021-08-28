<template>
  <div class="h-screen flex flex-col overflow-y-hidden bg-emerald-500 container">
    <div v-if="!matched" class="py-5 h-full flex">
      <div class="m-auto">
      <svg class="" version="1.1" id="L2" width="300px" height="300px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <circle class="stroke-current text-white" fill="none" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
          <animateTransform 
             attributeName="transform" 
             dur="2s"
             type="rotate"
             from="0 50 50"
             to="360 50 50"
             repeatCount="indefinite" />
        </line>
        <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
          <animateTransform 
             attributeName="transform" 
             dur="15s"
             type="rotate"
             from="0 50 50"
             to="360 50 50"
             repeatCount="indefinite" />
        </line>
      </svg>
      <h1 class="text-white mt-2">Loading ...</h1>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="matched" class="mb-4 h-full overflow-y-auto">
      <div>
        <div v-if="matched" class="">
          <p class="text-2xl text-gray-500 opacity-60">
            Sweet, now you can chat with
          </p>
          <p class="text-4xl">
            <span class="text-gray-500">{{ chatPartner }}</span>
            <span class="text-gray-500 opacity-60">!</span>
          </p>
        </div>
        <div class="mt-4 flex-1">
          <MessageBox
            class="flex"
            :class="message.from === socket.id ? 'flex-row-reverse' : ''"
            v-for="(message, index) in messages"
            :key="index"
            :previousMessage="index !== 0 ? messages[index - 1] : undefined"
            :message="message"
            :first="index === 0"
          >
          </MessageBox>
        </div>
      </div>
    </div>
    <ChatInput
      v-if="matched"
      :recipientId="chatPartner"
      class="w-11/12 mb-8 mx-auto"
      @sentMsg="onSentMsg"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ChatInput from "../components/Chat/InputField.vue";
import MessageBox from "../components/Chat/Message.vue";
import socket from "../socket";

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
    MessageBox,
  },

  setup() {
    const matched = ref(false);  
    const error = ref();

    socket.connect();

    socket.on("connect", () => {
        console.log(`Current socket's socket id = ${socket.id}`)
        socket.emit("match");
      }
    );
    socket.on("connect_error", () => {
      error.value = "There was problem connecting to the server :/"
    });

    const chatPartner = ref("");
    socket.on("matched", (response) => {
      chatPartner.value = response.matchedUser; 
      matched.value = true; 
      console.log(`{chatPartner.value}`)
    })

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

    return { matched, chatPartner, error, messages, socket, onSentMsg };
  },
});
</script>

<style scoped>
.h-65-100 {
  height: 90vh;
}
</style>
