import { IsEmail, IsString } from 'class-validator';

export class QueryUserDto {
  @IsString()
  search: string;

  @IsString()
  @IsEmail()
  email: string;
}
