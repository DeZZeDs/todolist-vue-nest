<script setup lang="ts">
  import searchIcon from '../../../assets/search.svg';

  interface Props {
    modelValue: string,
    placeholder?: string;
    inputType?: string;
    isSearch?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:model-value', value: string): void
  }>();

  const updateInput = (e: Event) => {
    emit('update:model-value', (e.target as HTMLInputElement).value)
  }
</script>

<template>
  <div class="input__wrapper">
    <input
        class="input"
        :type="props.inputType"
        :placeholder="props.placeholder"
        :value="modelValue"
        @input="updateInput"
    />
    <i v-if="props.isSearch" class="search-icon"><img alt="search" :src="searchIcon"/></i>
  </div>
</template>

<style scoped>
  .input__wrapper {
    position: relative;
  }
  .input {
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding:12px 37px 12px 12px;
    width: 100%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
  }
  .search-icon {
    position: absolute;
    right:9px;
    top:7px;
  }
</style>