/* eslint-disable prettier/prettier */
import { UsersEntity } from '@app/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(user): Promise<UsersEntity[] | any> {
    const userCreate = await this.usersRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 15),
    });
    return await this.usersRepository.save(userCreate).catch((error) => {
      return {
        error: {
          message: error.message,
        },
      };
    });
  }

  async getUsers(id: string): Promise<UsersEntity> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email: email } });
    const passwordIsValid = await bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    delete user.password
    return user;
  }
}
