import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port || 3000);

  console.log(
    `HTTP 服务已启动，监听端口: ${config.port || 3000}，进程 ID：${
      process.pid
    }`,
  );
}
bootstrap();
