import { IsJWT, IsNumber, IsString } from 'class-validator';

export class LogoutDto {
  @IsString()
  @IsJWT()
  refreshToken: string;
}
