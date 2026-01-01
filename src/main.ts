import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import pc from 'picocolors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      disableRequestLogging: true,
      logger: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onResponse', (req, reply, done) => {
      const { method, url, ip } = req;
      const status = reply.statusCode;
      const time = reply.elapsedTime;

      console.log(
        `[${new Date().toLocaleTimeString()}] ${pc.cyan(method)} ${pc.white(url)} ${status >= 400 ? pc.red(status) : pc.green(status)} ${pc.yellow(time.toFixed(3) + 'ms')} - ${ip}`,
      );

      done();
    });

  app.register(helmet);

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
