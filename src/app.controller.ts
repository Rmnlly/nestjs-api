import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//this will handle your-domain/, we're handling the route for home
//we would need a method in here to handle other routes like @Controller("/hair-styles") to handle that route
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //dependency injection here ^^
  //The appService is of type AppService, it checks the providers list in the module and then returns us that

  //This decorator @Get is fired when a get request is made to your-domain/, but if we did your-domain/hair this isn't fired
  //If uptop we called @Controller("hair") and set this to @Get("styles") the get would handle requests for /hair/styles
  @Get()
  getHello(): { name: string } {
    return { name: 'raman' };
  }
}
