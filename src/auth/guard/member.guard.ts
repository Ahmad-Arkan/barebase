import { UserRole } from 'src/generated/prisma/enums';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MemberRepository } from 'src/members/members.repository';
import { ErrorCode } from 'src/helper/enum/error-code';

@Injectable()
export class MemberGuard implements CanActivate {
  constructor(private readonly memberRepo: MemberRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const storeId = parseInt(request.params.storeId);

    if (!user || !storeId) {
      throw new ForbiddenException({
        message: 'User or Store not found',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    if (user.role === UserRole.SUPERADMIN) return true;

    const member = await this.memberRepo.findOne(storeId, user.userId);

    if (!member) {
      throw new ForbiddenException({
        message: 'You are not a member of this store',
        errorCode: ErrorCode.FORBIDDEN_RESOURCE,
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    request.member = member;

    return true;
  }
}
