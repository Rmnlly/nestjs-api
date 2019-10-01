import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AppController], //handling incoming requests (sending responses as well)
  providers: [AppService],
  //these provide certain functionality (like reaching into a db to get data, then the controlling calls this service)
  //This can keep out controlers clean, not needing to have direct access to the db
})
export class AppModule {}
