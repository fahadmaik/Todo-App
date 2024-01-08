import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
// @Injectable()
export class UserRepository extends Repository<User> {
  async store(data: any) {
    let d = this.create({ ...data });
    return await this.save(d);
  }
}
