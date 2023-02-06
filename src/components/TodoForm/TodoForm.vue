<script setup lang="ts">
  import Input from "../UI/Input/Input.vue";
  import {defineProps, ref, Ref} from "vue";
  import Button from "../UI/Button/Button.vue";
  import { ITaskModel } from "../../models/Task";

  const props = defineProps<{
    isActiveDone: boolean,
    mapTasksRefs: {
      searchValue: string,
      createValue: string,
    }
  }>();

  const mapTasksRefs = props.mapTasksRefs;

  const emit = defineEmits<{
    (e: 'addTask', value: string): void
    (e: 'doneAll'): void
    (e: 'search'): ITaskModel[]
    (e: 'submit') : void
  }>();

  const submitForm = (event: Event) => {
    event.preventDefault();
    mapTasksRefs.createValue = '';
  }
</script>

<template>
  <div class="form-wrapper">
    <form @submit="submitForm" class="form">
      <Input
          v-model="mapTasksRefs.searchValue"
          :is-search="true"
          placeholder="Поиск..."
          class="searchInput"
          @input="emit('search')"
      />
      <!-- searchInput классы именуются в kebab-case т.е. search-input -->
      <Input
          v-model="mapTasksRefs.createValue"
          input-type="text"
          placeholder="Введите название задачи"
          class="inputCreate"
      />
      <Button
          class="buttonAdd"
          @click="emit('addTask', mapTasksRefs.createValue)"
      >Add</Button>
      <Button
          class="buttonAll"
          @click="emit('doneAll')"
      >All</Button>
    </form>
  </div>
</template>

<style scoped>
  .form {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 20px;
  }
  .searchInput {
    grid-column: auto/span 5;
  }
  .inputCreate {
    grid-column: auto/span 5;
  }
  .buttonAdd {
    filter: drop-shadow(0px 4px 4px rgba(11, 133, 0, 0.25));
    border-radius: 5px;
    border: 1px solid rgba(40, 106, 0, 0.75);
    background: #fff;
    padding: 14px 23px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #3A3A3A;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 41px;
    transition: all .2s ease-in;
    grid-column: auto/span 1;
  }

  .buttonAdd:hover {
    background-color:rgba(155, 206, 47, 0.5)
  }
  .buttonAll {
    grid-column: auto/span 1;
    border: 1px solid rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 5px;
    max-height: 41px;
    background-color:#fff;
    transition: all .2s ease-in;
  }
  .buttonAll:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
</style>
