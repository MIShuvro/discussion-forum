import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@common/database/database.module';
import { ForumModule } from './forum/forum.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), IndexModule, DatabaseModule, ForumModule],
  controllers: [],
  providers: []
})
export class ApiModule {

}
