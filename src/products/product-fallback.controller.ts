import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductFallbackController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':productId')
  getProducts(@Param('productId') productId: number) {
    return this.productsService.findFallback(productId);
  }
}
