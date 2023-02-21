import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TourPackage } from './tourpackages/entities/tourpackage.entity';
import { TourpackagesModule } from './tourpackages/tourpackages.module';
import { ImageModule } from './image/image.module';
import { Image } from './image/entities/image.entity';


@Module({
  imports: [TourpackagesModule,
  MulterModule.register({
    dest: './CoverImage',
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username:"root",
    password:"",
    database: 'fly-far-ladies',
    autoLoadEntities:true,
    entities: [TourPackage,Image],
    synchronize:true,
  }),
  UsersModule,
  ImageModule,
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
