import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    // const prodId = new Date().toString();
    const prodId = Math.random().toString(); //not perfect, just as a proof
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  fetchProducts() {
    return [...this.products];
    //We don't want to return a direct reference to products
    //So we create a copy of the products
    //We could map over the individual products to make sure they can't be altered later on
  }

  getASingleProduct(productId: string) {
    const [product] = this.findProduct(productId);
    return { ...product }; //Creating a new object with new key/value pairs
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    //Setting the values to overwrite our selected prodct if they exist, if they don't then we short circuit
    const updateProduct = {
      ...product,
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
    };
    this.products[index] = updateProduct;
  }

  deleteProduct(productId: string) {
    const [_, index] = this.findProduct(productId);
    this.products = this.products.filter((prod, i) => i !== index);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException(`could not find the product for id ${id}`);
    }
    return [product, productIndex];
  }
}
