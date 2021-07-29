<template>
  <div class="grid grid-cols-8 grid-rows-6">
    <div class="mx-auto col-span-1 row-span-6">Sidebar Placeholder</div>
    <div class="col-span-6 row-span-5">
      <div
        class="object-left"
        v-for="(message, index) in dummyMessages"
        :key="index"
      >
        <div v-for="user in users" :key="user.userId">
          <h1>{{ user.userId }}</h1>
        </div>
        {{ message }}
      </div>
    </div>
    <div class="mx-2 col-span-1 row-span-6">Extra sidebar Placeholder</div>
    <ChatInput class="col-span-6 bg-red-500" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ChatInput from "@/components/Chat/InputField.vue";
import socket from "../socket";

const users = ref([] as Array<any>);

const dummyMessages = ["duh", "dun", "nice"];

socket.emit("users");
export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
  },
  setup() {
    socket.connect();

    socket.on("connect_error", () => {
      console.log("weird");
    });
    socket.on("users", (data) => {
      users.value = data.filter((user: any) => user.userId !== socket.id);
    });
    socket.on("user connected", (data) => {
      users.value.push(data);
    });

    onBeforeRouteLeave(() => {
      socket.offAny();
      socket.disconnect();
    });

    return { users, dummyMessages, socket };
  },
});
</script>
