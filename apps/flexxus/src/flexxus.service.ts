import { Injectable } from '@nestjs/common';

@Injectable()
export class FlexxusService {
  getHello(): string {
    return 'Hello World!';
  }
}
