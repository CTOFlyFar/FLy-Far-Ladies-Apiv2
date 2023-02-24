import { JoinColumn, OneToOne } from 'typeorm';
import { image } from 'src/image/entities/image.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { packageincluded } from './PackageInclude.entity';
import { packageinclusion } from './packageInclusion.entitry';
import { tourpackageplan } from './tourpackageplan.entity';

@Entity()
export class tourpackage {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ unique: true })
  PkId: string;
  @Column()
  MainTitle: string;
  @Column()
  SubTitle: string;
  @Column()
  Price: string;
  @Column()
  Location: string;
  @Column()
  StartDate: string;
  @Column()
  EndDate: string;
  @Column()
  TripType: string;
  @Column({ default: true })
  Availability: boolean;
  @Column()
  TotalDuration: string;
  @Column('text')
  PackageOverview: string;
  @Column('text')
  PackageVisitedPlace: string;
  @Column('text')
  PackageHighlight: string;
  @Column('text')
  PackageTourPlan: string;
  @Column()
  PackageExclusion: string;
  @Column('text')
  PackageBookingPolicy: string;
  @Column('text')
  PackageRefundPolicy: string;
  @Column()
  AlbumTitle: string;
  @Column()
  AlbumImage: string;

  @Column({ default: true })
  Showpackage: boolean;

  @OneToOne(() => image)
  @JoinColumn({ name: 'cartImage' })
  cartimage: image;

  @OneToOne(() => packageinclusion)
  @JoinColumn()
  PackageInclusions: packageinclusion;

  @OneToOne(() => packageincluded)
  @JoinColumn({ name: 'package_included' })
  packageincluded: packageincluded;

  @OneToOne(() => tourpackageplan)
  @JoinColumn({ name: 'Tour_package_Plan' })
  tourpackageplans: tourpackageplan;
}
