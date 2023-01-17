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
}
