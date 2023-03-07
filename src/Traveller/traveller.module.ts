import { TravellerController } from './traveller.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Traveller } from "./entities/traveller.entity";
import { TravellerServices } from "./traveller.services";



@Module({
   imports: [TypeOrmModule.forFeature([Traveller])],
   controllers:[TravellerController],
   providers:[TravellerServices]

})

export class TravellerModule{}