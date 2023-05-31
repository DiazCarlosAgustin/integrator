import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ParametersService {
  addHello(data) {
    Logger.debug(`Se agrego correctamente ${data}`);
  }

  getHello() {
    return { data: [1, 2, 3, 4, 5, 6] };
  }
}
