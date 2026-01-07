import { IsNumber, IsString } from 'class-validator';

export class UpdateProductImageDto {
  @IsString()
  altText: string;

  @IsNumber()
  order: number;
}
