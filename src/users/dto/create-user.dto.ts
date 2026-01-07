import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserStatus } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  userStatus?: UserStatus;
}
