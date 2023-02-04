<script setup lang="ts">

</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding:12px;
  }
</style>