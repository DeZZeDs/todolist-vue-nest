import axios from '../api';
import {ITaskModel} from "../../models/Task";

export class TodoService {

    static async getAll () {
        const {data}  = await axios.get<ITaskModel[]>('/todo/getAll');
        return data;
    }

    static async createTask(task: ITaskModel) {
        const {data} = await axios.post<ITaskModel>('/todo/createTask', {
            name: task.name,
            status: false
        });
       return data;
    }

    static async deleteTask(id: number) {
        const {status} = await axios.delete(`/todo/${id}`);
        return status;
    }

    static async updateTask(id: number) {
        const {status} = await axios.patch(`/todo/${id}`);
        return status;
    }

    static async doneAll() {
        const {data} = await axios.post<ITaskModel[]>(`/todo/doneAll`);
        return data;
    }

}

