import { IsOptional, IsString } from 'class-validator';

export class QueryTransactionDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  order?: string;
}
