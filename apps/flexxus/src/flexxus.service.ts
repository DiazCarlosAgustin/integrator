import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlexxusService {
  constructor(private readonly axios: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async login(parameters): Promise<boolean> {
    console.log(
      '🚀 ~ file: flexxus.service.ts:12 ~ FlexxusService ~ login ~ parameters:',
      parameters,
    );
    const url = ``;
    // const result =  await this.axios.get()
    return null;
  }
}
