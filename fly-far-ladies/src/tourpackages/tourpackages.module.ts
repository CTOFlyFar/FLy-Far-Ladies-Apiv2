
import { tourpackage } from './entities/tourpackage.entity';
import { Module} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([tourpackage])],
  controllers: [TourpackagesController],
  providers: [TourpackagesService]
  
})
export class TourpackagesModule {}
