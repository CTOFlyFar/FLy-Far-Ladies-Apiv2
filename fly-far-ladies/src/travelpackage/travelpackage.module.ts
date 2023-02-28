import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TravelpackageService } from './travelpackage.service';
import { TravelpackageController } from './travelpackage.controller';
import { Travelpackage } from './entities/travelpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Travelpackage])],
  controllers: [TravelpackageController],
  providers: [TravelpackageService]
})
export class TravelpackageModule {}
