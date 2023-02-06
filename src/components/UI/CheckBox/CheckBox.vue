<script setup lang="ts">
  import image from "../../../assets/checkbox.svg";
  import {defineProps} from "vue";
  const props = defineProps<{
    checked: boolean,
    taskId: number,
  }>();
</script>

<template>
  <div class="custom-checkbox">
    <input
        :id="props.taskId?.toString()"
        type="checkbox"
        class="checkbox"
        :checked="props.checked"
        disabled
    />
    <label :for="props.taskId?.toString()" class="label"><img :src="image" alt="checkbox" class="image"></label>
  </div>
</template>

<style scoped>
  .checkbox {
    display: none;
  }
  .label {
    background: #fff;
    background-blend-mode: darken;
    border: 1px solid rgba(40, 106, 0, 0.75);
    border-radius: 5px;
    width: 51px;
    height: 31px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-in;
  }

  .image {
    flex-shrink: unset;
  }

  .label:hover {
    cursor: pointer;
    background: rgba(217, 253, 189, 1);
  }
</style>