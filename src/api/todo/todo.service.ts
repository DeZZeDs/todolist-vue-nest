import axios from '../api';
import {ITaskModel} from "../../models/Task";

export class TodoService {

    static async getAll () {
        try {
            const {data}  = await axios.get<ITaskModel[]>('/todo/getAll');
            return data;
        }
        catch(e) {
            console.error(e);
        }
    }

    static async createTask(task: ITaskModel) {
        try {
            const {data} = await axios.post<ITaskModel>('/todo/createTask', {
                name: task.name,
                status: false
            });
            return data;
        }
        catch(e) {
            console.error(e);
        }
    }

    static async deleteTask(id: number) {
        try {
            const {status} = await axios.delete(`/todo/${id}`);
            return status;
        }
        catch(e) {
            console.error(e);
        }
    }

    static async updateTask(id: number) {
        try {
            const {status} = await axios.patch(`/todo/${id}`);
            return status;
        }
        catch(e) {
            console.error(e);
        }
    }

    static async doneAll() {
        try {
            const {data} = await axios.post<ITaskModel[]>(`/todo/doneAll`);
            return data;
        }
        catch(e) {
            console.error(e);
        }
    }

}

