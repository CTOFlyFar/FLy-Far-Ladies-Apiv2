import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { TourPackage } from './tourpackages/entities/tourpackage.entity';
import { TourpackagesModule } from './tourpackages/tourpackages.module';


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
  ImagesModule
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
