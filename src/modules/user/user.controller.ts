import { Controller, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/list')
  async getList() {
    const users = await this.userService.list();
    return {
      code: 200,
      message: '获取列表成功',
      data: users,
    };
  }

  @Get('/info')
  async getInfo(@Query('id') id: number) {
    const user = await this.userService.getInfo(id);
    return {
      code: 200,
      message: '获取成功',
      data: user,
    };
  }
}
