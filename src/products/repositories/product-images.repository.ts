import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductImageDto } from '../dto/update-product-image.dto';

@Injectable()
export class ProductImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductImage(imageId: number, productId: number) {
    return await this.prisma.productImage.findUnique({
      where: {
        imageId,
        ownerId: productId,
      },
    });
  }

  async createProductImage(
    productId: number,
    publicId: string,
    order: number,
    thumbnail: string,
    url: string,
  ) {
    return await this.prisma.productImage.create({
      data: {
        ownerId: productId,
        publicId,
        order,
        thumbnail,
        url,
      },
    });
  }

  async updateProductImage(imageId: number, updateDto: UpdateProductImageDto) {
    return await this.prisma.productImage.update({
      where: {
        imageId,
      },
      data: updateDto,
    });
  }

  async deleteProductImage(imageId: number) {
    return await this.prisma.productImage.delete({
      where: {
        imageId,
      },
    });
  }
}
