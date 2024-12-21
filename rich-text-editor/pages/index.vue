<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Rich Text Editor</h1>
    <RichTextEditor v-model="content" />

    <div class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Preview:</h2>
      <div class="prose" v-html="content"></div>
    </div>

    <!-- <pre>{{ content }}</pre> -->
  </div>
</template>

<script setup>
const content = ref("");
</script>
