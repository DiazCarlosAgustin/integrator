import { UsersService } from './users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user) {
    const userValidate = await this.usersService.validateUser(
      user.email,
      user.password,
    );

    if (!userValidate) {
      return null;
    }

    const token = await this.jwtService.signAsync(JSON.stringify(userValidate));

    return { token, user: userValidate };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
