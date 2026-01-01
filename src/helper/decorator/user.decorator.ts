import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Tentukan tipe request sebagai FastifyRequest
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    // Di Fastify (saat pakai Passport), user tetap ditempel di request.user
    const user = (request as any).user;

    return data ? user?.[data] : user;
  },
);
