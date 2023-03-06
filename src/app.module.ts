

import { AlbumImage } from './tourpackages/entities/albumimage.entity';
import { refundpolicy } from './tourpackages/entities/refundpolicy.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourpackagesModule } from './tourpackages/tourpackages.module';
import { Tourpackage } from './tourpackages/entities/tourpackage.entity';
import { packageincluded } from './tourpackages/entities/PackageInclude.entity';
import { Packageinclusion } from './tourpackages/entities/packageInclusion.entitry';
import { tourpackageplan } from './tourpackages/entities/tourpackageplan.entity';
import { packageexcluions } from './tourpackages/entities/packageexclsuions.entity';
import { packagehighlight } from './tourpackages/entities/packagehighlight.entity';
import { bookingpolicy } from './tourpackages/entities/bookingpolicy.entity';
import { VisitedPalce } from './tourpackages/entities/visitedplace.entity';
import { CardImage } from './tourpackages/entities/cardImage.entity';
import { User } from './Auth/entities/user.entity';
import { UserModule } from './Auth/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'flyfarint.com',
    port: 3306,
    username: 'flyfarin_fflv2',
    password: '123Next2$',
    database: 'flyfarin_fflv2',
      entities: [
        User,
        Tourpackage,
        AlbumImage,
        CardImage,
        packageexcluions,
        packageincluded,
        Packageinclusion,
        tourpackageplan,
        packagehighlight,
        refundpolicy,
        bookingpolicy,
        VisitedPalce,
      ],
      synchronize: true,
    }),
    TourpackagesModule,
    UserModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }






// host: '127.0.0.1',
// port: 3306,
// username: 'root',
// password: '',
// database: 'flyfar-ladies',

// host: 'flyfarint.com',
// port: 3306,
// username: 'flyfarin_fflv2',
// password: '123Next2$',
// database: 'flyfarin_fflv2',