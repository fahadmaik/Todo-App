import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.TodoRepository.save(todo);
  }

  async findAllTodoByUserNotCompleted(userId: number): Promise<Todo[]> {
    return this.TodoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  async findAllTodoByUserCompleted(userId: number): Promise<Todo[]> {
    return this.TodoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }
  update(todoId: number) {
    return this.TodoRepository.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    return this.TodoRepository.delete(todoId);
  }
}
