import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateTodoDto} from './dto/create-todo.dto';
import {Todo} from './entity/todo.entity';
import {isAllActiveTodos} from "../utils/isAllActiveTasks";

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

    async getAllTodos () {
        const todos = await this.todoRepository.find();
        return todos.sort((a,b) => a.id - b.id);
    }

    async createTodo(todo: CreateTodoDto) {
        const newTodo = await this.todoRepository.create(todo);
        newTodo.status = false;
        await this.todoRepository.save(newTodo);
        return newTodo;
    }

    async updateTodo(taskId) {
        const task:Todo= await this.todoRepository.findOne({
            where: {
                id: taskId.id
            }
        });
        task.status = !task.status;
        const isSave = await this.todoRepository.save(task);
        if(isSave) {
            return HttpStatus.OK;
        }
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    async deleteTodo(id: number) {
        const deletedTodo = await this.todoRepository.delete(id);
        if(deletedTodo) {
            return HttpStatus.OK;
        }
        if (!deletedTodo.affected) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
    }

    async doneAll() {
        const allTodos = await this.todoRepository.find();

        const isActiveTasks = isAllActiveTodos(allTodos);
        allTodos.forEach(todo => todo.status = !isActiveTasks);
        const savedTodos = await this.todoRepository.save(allTodos);
        if(savedTodos) {
            return this.getAllTodos();
        }
    }
}