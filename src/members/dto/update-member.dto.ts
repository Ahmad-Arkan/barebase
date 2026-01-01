import { IsEnum, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { MemberRole, MemberStatus } from 'src/generated/prisma/enums';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsString()
  @IsEnum(MemberRole)
  role: MemberRole;

  @IsString()
  @IsEnum(MemberStatus)
  status: MemberStatus;
}
