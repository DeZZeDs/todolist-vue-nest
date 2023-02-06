import {ITaskModel} from "../models/Task";
import {onMounted, ref} from "vue";
import {TodoService} from "../api/todo/todo.service";
import {HTTP_OK} from "../api/consts";

export default function useTasks() {

    const tasks = ref<ITaskModel[]>([]);

    const fetching = async () => {
        try {
            const data: ITaskModel[] = await TodoService.getAll();
            tasks.value = data;
        }
        catch(e) {
            console.error(e);
        }
    }

    onMounted(fetching);

    const isActiveAllDone = ref<Boolean>(false);

    const changeStatus = async (id: number | undefined) => {
        try {
            if(typeof id !== "number") return
            const status = await TodoService.updateTask(id);
            if(status === HTTP_OK) {
                tasks.value.forEach(task => {
                    if(task.id === id) {
                        task.status = !task.status;
                    }
                })
            }
        }
        catch(e) {
            console.error(e);
        }

    }

    const doneAll = async () => {
        try {
            const todos:ITaskModel[] = await TodoService.doneAll();
            if(todos.length > 0) {
                tasks.value = todos;
                isActiveAllDone.value = !isActiveAllDone.value;
            }
        }
        catch(e) {
            console.error(e);
        }

    }

    const addTask = async (name: string) => {
        try {
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
        catch(e) {
            console.error(e);
        }
    }

    const removeTask = async (task: ITaskModel) => {
        try {
            if(!task.id) return
            const status = await TodoService.deleteTask(task.id);
            if(status === HTTP_OK) {
                tasks.value = tasks.value.filter(taskItem => taskItem !== task);
            }
        }
        catch(e) {
            console.error(e);
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