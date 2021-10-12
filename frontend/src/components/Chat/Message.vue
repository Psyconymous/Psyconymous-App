<template>
  <div>
    <div class="mx-2 left-0 top-0 align-left">
      <h3
        v-if="
          previousMessage === undefined || message.from !== previousMessage.from
        "
        class=""
      >
        {{ message.from }}
      </h3>
      <p class="border-2 rounded-lg px-2">{{ message.content }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageBox",
  props: {
    message: {
      type: Object,
      required: true,
    },
    previousMessage: {
      type: Object,
      required: true,
    },
  },
});
</script>
