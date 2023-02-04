import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {CreateTodoDto} from "./dto/create-todo.dto";

@Controller('todo')
export class TodoController {
    constructor(private readonly todosService: TodoService) {}
    @Post('createTask')

    async createTask(@Body() dto: Omit<CreateTodoDto, 'id'>) {
        return this.todosService.createTodo(dto);
    }

    @Patch(':id')
    async updateTask(@Param() id:number) {
        return this.todosService.updateTodo(id);
    }

    @Delete(':id')
    async deleteTask(@Param() id:number) {
        return this.todosService.deleteTodo(id);
    }

    @HttpCode(200)
    @Post('doneAll')
    async doneAll() {
        return this.todosService.doneAll();
    }

    @HttpCode(200)
    @Get('getAll')
    async getAll() {
        return this.todosService.getAllTodos();
    }
}
