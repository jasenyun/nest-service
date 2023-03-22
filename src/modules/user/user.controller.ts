import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserDto } from './user.dto';
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

  @Post('/:id/update')
  async UpdateInfo(@Param('id') id: number, @Body() dto: UserDto) {
    const user = await this.userService.getInfo(id);
    if (!user) {
      return {
        code: -1,
        message: '未找到用户',
      };
    }
    const update = new User();
    update.name = dto.userName;
    update.code = dto.code;

    const result = await this.userService.UpdateUser(id, update);
    const message = result ? '更新成功' : '更新失败';

    return {
      code: 200,
      message,
    };
  }

  @Post('/add')
  async CreateUser(@Body() dto: UserDto) {
    const model = new User();
    model.name = dto.userName;
    model.code = dto.code;

    const result = await this.userService.createUser(model);
    const message = result ? '创建成功' : '创建失败';

    return {
      code: 200,
      message,
      data: result,
    };
  }
}
