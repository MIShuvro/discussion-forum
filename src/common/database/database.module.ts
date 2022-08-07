import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>{
        console.log('MONGO_DB_URL', configService.get('MONGO_DB_URL'))
        return {
          uri: configService.get('MONGO_DB_URL')
        }
      }
    })
  ]
})
export class DatabaseModule{}
