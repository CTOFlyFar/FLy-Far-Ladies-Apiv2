import { UserServices } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';



@Module({
   imports: [TypeOrmModule.forFeature([User]),

   JwtModule.register({
      secret:'jwtSecretKey',
      signOptions:{expiresIn:'1d'},
   }),
   
   ],
   controllers:[UserController],
   providers:[UserServices]

})

export class UserModule{}