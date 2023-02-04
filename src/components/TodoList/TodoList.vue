<script setup lang="ts">
import {defineProps, PropType, ComputedRef, Ref} from "vue";
  import {ITaskModel} from "../../models/Task";
  import TaskItem from "./TaskItem/TaskItem.vue";

  interface Props {
    tasks: ITaskModel[]
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: "changeStatus", value: number | undefined): void
    (e: "removeTask", value: ITaskModel): void
  }>();
</script>

<template>
  <ul class="task-list">
      <TaskItem
          v-for="task in props.tasks"
          class="task-item"
          :task="task"
          :key="task.id"
          @changeStatus="emit('changeStatus', task.id)"
          @removeTask="emit('removeTask', task)"
      />
  </ul>
</template>

<style scoped>
  .task-list {
    list-style: none;
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    margin-bottom: 25px;
    padding: 8px 6px;
  }
  .task-item:last-child {
    margin-bottom: 0;
  }
</style>
