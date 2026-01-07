import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';
import { ErrorCode } from 'src/helper/enum/error-code';
import { QueryUserDto } from './dto/query-user.dto';
import { MemberRepository } from 'src/members/members.repository';
import { StoreRepository } from 'src/stores/stores.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly storeRepo: StoreRepository,
    private readonly memberRepo: MemberRepository,
  ) {}

  async findAll(query: QueryUserDto) {
    return this.userRepo.findAll(query);
  }

  async findOne(userId: number) {
    const data = await this.userRepo.findById(userId);
    if (!data)
      throw new NotFoundException({
        message: 'User not found',
        errorCode: ErrorCode.USER_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });

    return data;
  }

  async findByEmail(email: string) {
    const data = await this.userRepo.findByEmail(email);
    if (!data)
      throw new NotFoundException({
        message: 'User not found',
        errorCode: ErrorCode.USER_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });

    return data;
  }

  async updateUser(updateDto: UpdateUserDto, userId: number) {
    const user = await this.findOne(userId);

    return await this.userRepo.updateUser(updateDto, user.userId);
  }

  async deleteUser(userId: number) {
    const user = await this.findOne(userId);
    const deleteDto = `${user.email}_deleted_${userId}`;
    await this.userRepo.deleteUser(deleteDto, userId);

    return { success: true, message: 'User deleted successfully' };
  }

  // Invitation
  async getInvitations(userId: number) {
    const user = await this.findOne(userId);
    const invitations = await this.memberRepo.getInvitations(user.userId);
    return invitations.map(({ memberId, ...data }) => ({
      invitationId: memberId,
      ...data,
    }));
  }

  async joinFromToken(token: string, userId: number) {
    const user = await this.findOne(userId);
    const store = await this.storeRepo.getInvitationToken(token);
    if (!store)
      throw new NotFoundException({
        message: 'Invitation not found or already processed',
        errorCode: ErrorCode.INVITATION_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });

    const member = await this.memberRepo.findAllMember(store.storeId);
    if (member.find((member) => member.userId === user.userId))
      throw new ConflictException({
        message: 'User is already a member of the store',
        errorCode: ErrorCode.USER_ALREADY_EXISTS,
        statusCode: HttpStatus.CONFLICT,
      });

    return this.memberRepo.createMember(store.storeId, user.userId, {
      role: 'STAFF',
      status: 'ACTIVE',
    });
  }

  async joinFromInvited(inviteId: number, accept: boolean, userId: number) {
    const user = await this.findOne(userId);
    const member = await this.memberRepo.joinFromInvited(
      inviteId,
      accept,
      user.userId,
    );
    if (!member)
      throw new NotFoundException({
        message: 'Invitation not found or already processed',
        errorCode: ErrorCode.INVITATION_NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
      });
    return member;
  }
}
