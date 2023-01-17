import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './common/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...config.database,
      name: 'default',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
