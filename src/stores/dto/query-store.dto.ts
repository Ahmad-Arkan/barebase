import { IsOptional, IsString } from 'class-validator';

export class QueryStoreDto {
  @IsOptional()
  @IsString()
  search?: string;
}
