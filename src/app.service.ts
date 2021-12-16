import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      errorCode: 0,
      status: 'Active',
    };
  }
}
