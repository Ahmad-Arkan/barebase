import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/helper/enum/error-code';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          message: 'Your session has expired, please refresh or login again',
          errorCode: ErrorCode.TOKEN_EXPIRED,
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      throw new UnauthorizedException({
        message: 'Token invalid or missing',
        errorCode: ErrorCode.INVALID_TOKEN,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return user;
  }
}
