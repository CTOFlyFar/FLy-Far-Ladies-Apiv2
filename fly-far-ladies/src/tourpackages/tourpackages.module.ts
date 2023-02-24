import { tourpackage } from './entities/tourpackage.entity';
import { Module } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { image } from 'src/image/entities/image.entity';
import { packageincluded } from './entities/PackageInclude.entity';
import { packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { packagehighlight } from './entities/packagehighlight.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { refundpolicy } from './entities/refundpolicy.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      tourpackage,
      image,
      packageincluded,
      packageinclusion,
      tourpackageplan,
      packageexcluions,
      packagehighlight,
      bookingpolicy,
      refundpolicy,
    ]),
  ],
  controllers: [TourpackagesController],
  providers: [TourpackagesService],
})
export class TourpackagesModule { }
