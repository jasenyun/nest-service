import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserProvider } from 'src/providers/user.provider';

@Injectable()
export class UserService {
  constructor(private userProvider: UserProvider) { }

  async list(): Promise<User[]> {
    return await this.userProvider.list();
  }

  async getInfo(id: number): Promise<User> {
    return await this.userProvider.findById(id);
  }

  async UpdateUser(id: number, updates: User): Promise<boolean> {
    return await this.userProvider.updateById(id, updates);
  }

  async createUser(model: User): Promise<any> {
    return await this.userProvider.createUser(model);
  }
}
