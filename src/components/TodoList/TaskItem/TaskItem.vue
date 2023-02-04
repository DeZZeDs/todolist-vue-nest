<script setup lang="ts">
  import {defineProps} from "vue";
  import Button from "../../UI/Button/Button.vue";
  import CheckBox from "../../UI/CheckBox/CheckBox.vue";
  import {ITaskModel} from "../../../models/Task";

  interface Props {
    task: ITaskModel
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: "changeStatus", value: number | undefined): void
    (e: "removeTask", value: ITaskModel): void
  }>();

</script>

<template>
    <li class="task-item" :class="{active: props.task.status}">
      <div class="task-info">
        <div class="task-id">{{props.task.id}}.</div>
        <div class="task-name">{{props.task.name}}</div>
      </div>
      <div class="task-actions">
        <CheckBox
            class="checkbox-block"
            @click="emit('changeStatus', props.task.id)"
            :checked="props.task.status"
            :taskId="props.task.id"
        />
        <Button
            class="delete"
            @click="emit('removeTask', props.task)"
        >Delete</Button>
      </div>
    </li>
</template>

<style scoped>

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
.task-info,
.task-actions {
  display: flex;
  align-items: center;
}

.task-id {
  margin-right: 43px;
}
.checkbox-block {
  margin-right: 17px;
}

.task-actions .delete {
  background: #fff;
  border: 1px solid #EF4444;
  border-radius: 5px;
  transition: all .2s ease-in;
  max-height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-actions .delete:hover {
  background-color:rgba(239, 68, 68, 1);
}

.task-item.active {
  background-color: rgba(155, 206, 47, 0.09);
}
</style>
