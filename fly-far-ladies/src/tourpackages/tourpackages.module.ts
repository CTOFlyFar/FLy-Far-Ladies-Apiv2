import { Module } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourPackage } from './entities/tourpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TourPackage])],
  controllers: [TourpackagesController],
  providers: [TourpackagesService]
})
export class TourpackagesModule {}
