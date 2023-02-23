
import { tourpackage } from './entities/tourpackage.entity';
import { Module} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { image } from 'src/image/entities/image.entity';
@Module({
  imports:[TypeOrmModule.forFeature([tourpackage,image])],
  controllers: [TourpackagesController],
  providers: [TourpackagesService]
  
})
export class TourpackagesModule {}
