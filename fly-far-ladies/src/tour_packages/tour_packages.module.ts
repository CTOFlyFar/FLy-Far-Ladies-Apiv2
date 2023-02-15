import { Module } from '@nestjs/common';
import { TourPackagesService } from './tour_packages.service';
import { TourPackagesController } from './tour_packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourPackage } from './entities/tour_package.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TourPackage])],
  controllers: [TourPackagesController],
  providers: [TourPackagesService]
})
export class TourPackagesModule {}
