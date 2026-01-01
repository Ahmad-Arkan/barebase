import { IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  token: string;

  @IsString()
  password: string;
}
