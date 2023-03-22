import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserProvider {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) { }

  async list() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async updateById(id: number, update: User) {
    const result = await this.repository.update(id, update);
    return result.affected > 0;
  }

  async createUser(model: User) {
    const result = await this.repository.create(model);
    return result;
  }
}
