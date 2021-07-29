<template>
  <div class="grid grid-cols-8 grid-rows-6">
    <div class="mx-auto col-span-1 row-span-6">Sidebar Placeholder</div>
    <div class="col-span-6 row-span-5">Text Display Placeholder</div>
    <div class="mx-2 col-span-1 row-span-6">Extra sidebar Placeholder</div>
    <ChatInput class="col-span-6 bg-red-500" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ChatInput from "@/components/Chat/InputField.vue";

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput,
  },
});
</script>
