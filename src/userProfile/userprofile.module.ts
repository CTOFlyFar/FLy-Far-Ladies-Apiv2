
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Userprofile } from "./entitties/userprofile.entities";

import { userProfileController } from './userprofile.controller';
import { UserProfileServices } from './userprofile.services';



@Module({
   imports: [TypeOrmModule.forFeature([Userprofile])],
   controllers:[userProfileController],
   providers:[UserProfileServices]

})

export class TravellerModule{}