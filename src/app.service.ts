import { Injectable } from '@nestjs/common';

//Could be reaching out to a db or something
//This will handle all the logic etc
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
