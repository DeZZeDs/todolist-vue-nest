<script setup lang="ts">
  import TodoForm from "../../components/TodoForm/TodoForm.vue";
  import TodoList from "../../components/TodoList/TodoList.vue";
  import useTasks from "../../hooks/useTasks";
  import useSearchTasks from "../../hooks/useSearchTask";

  const {
    tasksRef,
    isActiveAllDoneRef,
    doneAll,
    addTask,
    removeTask,
    changeStatus,
  } = useTasks();
  const {mapTasksRefs,searchTasks} = useSearchTasks(tasksRef);

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <h1 class="h1">Todo list</h1>
      <TodoForm
        @addTask="addTask"
        @doneAll="doneAll"
        :is-active-done="isActiveAllDoneRef.valueOf()"
        :map-tasks-refs="mapTasksRefs"
      />
      <TodoList
        :tasks="searchTasks"
        v-show="searchTasks.length > 0"
        class="task-list"
        @changeStatus="changeStatus"
        @removeTask="removeTask"
      />
      <div v-show="searchTasks.length === 0" class="empty">No tasks, let's create them!</div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin-top: 42px;
  }
  .h1 {
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;
    text-align: left;
    color: #000000;
    margin-bottom: 30px;
  }
  .task-list {
    margin-top: 42px;
  }

  .empty {
    font-weight: 400;
    font-size: 20px;
    line-height: 35px;
    text-align: left;
    color: #000000;
    margin: 30px 0;
  }
</style>
