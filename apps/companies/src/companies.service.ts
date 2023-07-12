import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  getHello(): string {
    return 'Hello World!';
  }
}
