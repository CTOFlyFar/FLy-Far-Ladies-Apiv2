
import { CartImage } from './tourpackages/entities/cartimage.entity';
import { AlbumImage } from './tourpackages/entities/albumimage.entity';
import { refundpolicy } from './tourpackages/entities/refundpolicy.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourpackagesModule } from './tourpackages/tourpackages.module';
import { ImageModule } from './image/image.module';
import { Tourpackage } from './tourpackages/entities/tourpackage.entity';
import { packageincluded } from './tourpackages/entities/PackageInclude.entity';
import { Packageinclusion } from './tourpackages/entities/packageInclusion.entitry';
import { tourpackageplan } from './tourpackages/entities/tourpackageplan.entity';
import { packageexcluions } from './tourpackages/entities/packageexclsuions.entity';
import { packagehighlight } from './tourpackages/entities/packagehighlight.entity';
import { bookingpolicy } from './tourpackages/entities/bookingpolicy.entity';
import { VisitedPalce } from './tourpackages/entities/visitedplace.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flyfar-ladies',
      autoLoadEntities:false,
      entities: [
        Tourpackage,
        AlbumImage,
        CartImage,
        packageexcluions,
        packageincluded,
        Packageinclusion,
        tourpackageplan,
        packagehighlight,
        refundpolicy,
        bookingpolicy,
        VisitedPalce,
      ],
      synchronize:true,
    }),
    TourpackagesModule,
    UsersModule,
    ImageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
