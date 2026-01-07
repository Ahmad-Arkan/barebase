import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from './members.repository';
import { QueryMemberDto } from './dto/query-member.dto';
import { ErrorCode } from 'src/helper/enum/error-code';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepo: MemberRepository) {}

  async findAll(storeId: number, query: QueryMemberDto) {
    return this.memberRepo.findAllMember(storeId, query);
  }

  async findOne(storeId: number, userId: number) {
    const member = await this.memberRepo.findOne(storeId, userId);
    if (!member)
      throw new NotFoundException({
        message: 'Member not found',
        errorCode: ErrorCode.USER_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });
    return member;
  }

  async updateMember(
    storeId: number,
    userId: number,
    updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberRepo.updateMember(storeId, userId, updateMemberDto);
  }

  async deleteMember(storeId: number, userId: number) {
    await this.memberRepo.deleteMember(storeId, userId);
    return { success: true, message: 'Member deleted successfully' };
  }
}
