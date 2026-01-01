import { IsEmail, IsEnum, IsString } from 'class-validator';
import { MemberRole } from 'src/generated/prisma/enums';

export class InvitationDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsEnum(MemberRole)
  role: string;
}
