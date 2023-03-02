import { Tourpackage } from './entities/tourpackage.entity';

import { TourpackagesService } from './tourpackages.service';
import { BookingPolicycontroller, TourpackagesController } from './tourpackages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { packageincluded } from './entities/PackageInclude.entity';
import { Packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { packagehighlight } from './entities/packagehighlight.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { refundpolicy } from './entities/refundpolicy.entity';
import { CartImage } from './entities/cartimage.entity';
import { AlbumImage } from './entities/albumimage.entity';
import { VisitedPalce } from './entities/visitedplace.entity';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tourpackage,
      CartImage,
      AlbumImage,
      VisitedPalce,
      packageincluded,
      Packageinclusion,
      tourpackageplan,
      packageexcluions,
      packagehighlight,
      bookingpolicy,
      refundpolicy,
    ]),
  ],
  controllers: [TourpackagesController,BookingPolicycontroller ],
  providers: [TourpackagesService, ],
  exports:[TourpackagesService]
})
export class TourpackagesModule { }
