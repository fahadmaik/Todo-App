import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
// @Injectable()
export class TodoRepository extends Repository<Todo> {
  async store(data: any) {
    let d = this.create({ ...data });
    return await this.save(d);
  }
}
