import {Todo} from "../todo/entity/todo.entity";

export const isAllActiveTodos = (tasks: Todo[]) => {
    const tasksLength = tasks.length;
    let countTrue = 0;
    tasks.forEach(todo => {
        if(todo.status === true) {
            countTrue++;
        }
    });
    console.log(countTrue);
    return (tasksLength === countTrue) ? true : false;
}