import {ITaskModel} from "../models/Task";
import {computed, reactive, Ref, ref} from "vue";

export default function useSearchTasks(tasksRef: Ref<ITaskModel[]>) {
    //Если передавать просто ref, то он делает unwrap, и в пропсах получаем значение, вместо реактивной переменной
    const mapTasksRefs = reactive(new Map([
        ['searchValue', ref('')],
        ['createValue', ref('')],
    ]));
    const searchRef = mapTasksRefs.get('searchValue');
    const searchTasks = computed(() => {
        if(searchRef !== undefined) {
            return tasksRef.value?.filter(taskItem => taskItem.name.toLowerCase().includes(searchRef.value.toLowerCase()));
        }
        else {
            return []
        }
    });

    return {
        mapTasksRefs,
        searchTasks,
    }
}