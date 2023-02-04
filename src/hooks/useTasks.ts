import {ITaskModel} from "../models/Task";
import {onMounted, ref} from "vue";
import {TodoService} from "../api/todo/todo.service";
import {HTTP_OK} from "../api/consts";

export default function useTasks() {

    const tasks = ref<ITaskModel[]>([]);

    const fetching = async () => {
        const data: ITaskModel[] = await TodoService.getAll();
        tasks.value = data;
    }

    onMounted(fetching);

    const isActiveAllDone = ref<Boolean>(false);

    const changeStatus = async (id: number | undefined) => {
        if(typeof id === "number") {
            const status = await TodoService.updateTask(id);
            if(status === HTTP_OK) {
                tasks.value.forEach(task => {
                    if(task.id === id) {
                        task.status = !task.status;
                    }
                })
            }
        }
    }

    const doneAll = async () => {
        const todos:ITaskModel[] = await TodoService.doneAll();
        if(todos.length > 0) {
            tasks.value = todos;
            isActiveAllDone.value = !isActiveAllDone.value;
        }
    }

    const addTask = async (name: string) => {
        if(!name || name === '' || name.trim() === '') return
        const newTask = {
            id:3,
            name,
            status:false
        } as ITaskModel

        const createdTask = await TodoService.createTask(newTask);
        if(createdTask) {
            tasks.value.push(createdTask);
        }
    }

    const removeTask = async (task: ITaskModel) => {
        if(task.id) {
            const status = await TodoService.deleteTask(task.id);
            if(status === HTTP_OK) {
                tasks.value = tasks.value.filter(taskItem => taskItem !== task);
            }
        }
    }

    return {
        tasksRef: tasks,
        isActiveAllDoneRef: isActiveAllDone,
        changeStatus,
        doneAll,
        addTask,
        removeTask,
    }
}