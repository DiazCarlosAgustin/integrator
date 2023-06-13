/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from '@app/common';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post()
  async createUser(@Body() user: UsersDTO) {
    try {
      return this.usersService.createUser(user)
    } catch (error) {
      return error.message;
    }
  }
}
