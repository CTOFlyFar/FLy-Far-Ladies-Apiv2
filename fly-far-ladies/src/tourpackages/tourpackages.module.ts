
import { tourpackage } from './entities/tourpackage.entity';
import { Module} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Image]),TypeOrmModule.forFeature([tourpackage])],
  controllers: [TourpackagesController],
  providers: [TourpackagesService]
  
})
export class TourpackagesModule {}
