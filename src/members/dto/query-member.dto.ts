import { IsEmail, IsOptional, IsString } from 'class-validator';

export class QueryMemberDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}
