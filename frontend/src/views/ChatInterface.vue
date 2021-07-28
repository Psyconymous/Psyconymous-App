<template>
  <div class="px-24 grid grid-cols-1 gap-4">
    <div class=""><ChatInput class="bg-red-500"/></div>
  </div>  
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ChatInput from "@/components/Chat/InputField.vue";

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatInput
  }
})
</script>
