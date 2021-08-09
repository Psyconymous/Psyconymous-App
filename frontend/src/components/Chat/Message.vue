<template>
  <div class="mx-2 left-0 top-0 align-left">
     <p class="">{{ message.from }}</p>
     <p class="border-2 rounded-lg">{{ message.content }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "MessageBox",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
});
</script>

