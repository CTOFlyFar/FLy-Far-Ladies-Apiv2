import { tourpackage } from './entities/tourpackage.entity';
import { Module } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { packageincluded } from './entities/PackageInclude.entity';
import { packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { packagehighlight } from './entities/packagehighlight.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { refundpolicy } from './entities/refundpolicy.entity';
import { CartImage } from './entities/cartimage.entity';
import { AlbumImage } from './entities/albumimage.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      tourpackage,
      CartImage,
      AlbumImage,
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
