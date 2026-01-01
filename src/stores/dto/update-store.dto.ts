import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { StoreStatus } from 'src/generated/prisma/enums';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsOptional()
  @IsNumber()
  ownerId?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(StoreStatus)
  storeStatus?: StoreStatus;
}
