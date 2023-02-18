import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TourPackagesModule } from './tour_packages/tour_packages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { users } from './users/entities/user.entity';
import { TourPackage } from './tour_packages/entities/tour_package.entity';
import { CoverImage } from './tour_packages/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MulterModule.register({
    dest: './CoverImage',
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username:"root",
    password:"",
    database: 'flyfar-ladies',
    autoLoadEntities: true,
    entities: [users, TourPackage, CoverImage],
    synchronize:true
  }),UsersModule, TourPackagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
