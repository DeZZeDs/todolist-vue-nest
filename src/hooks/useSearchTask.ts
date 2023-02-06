import { ITaskModel } from "../models/Task";
import { computed, reactive, Ref, ref } from "vue";

export default function useSearchTasks(tasksRef: Ref<ITaskModel[]>) {
  //Если передавать просто ref, то он делает unwrap, и в пропсах получаем значение, вместо реактивной переменной
  const mapTasksRefs = reactive({
    searchValue: "",
    createValue: "",
  });
  const searchTasks = computed(() => {
    if (mapTasksRefs.searchValue !== undefined) {
      return tasksRef.value.filter((task) =>
        task.name
          .toLowerCase()
          .localeCompare(mapTasksRefs.searchValue.toLowerCase())
      );
      // return tasksRef.value?.filter(taskItem => taskItem.name.toLowerCase().includes(mapTasksRefs.searchValue.toLowerCase()));
    }
    return [];
  });

  return {
    mapTasksRefs,
    searchTasks,
  };
}
