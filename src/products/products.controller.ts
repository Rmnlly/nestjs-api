import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProducts(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.fetchProducts();
  }

  @Get(':id')
  //id is a dynamic segment like in express, so calling products/1 will make id be 1
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getASingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
  }
}
