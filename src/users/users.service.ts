import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';
import { ErrorCode } from 'src/helper/enum/error-code';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

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
}
