import { IsEnum, IsString } from 'class-validator';
import { MemberRole, MemberStatus } from 'src/generated/prisma/enums';

export class CreateMemberDto {
  @IsString()
  @IsEnum(MemberRole)
  role: MemberRole;

  @IsString()
  @IsEnum(MemberStatus)
  status: MemberStatus;
}
