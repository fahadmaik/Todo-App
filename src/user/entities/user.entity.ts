import { todo } from 'node:test';
import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
