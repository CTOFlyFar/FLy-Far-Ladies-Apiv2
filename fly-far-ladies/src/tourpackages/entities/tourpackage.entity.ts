import { JoinColumn, OneToOne } from 'typeorm';
import { image } from 'src/image/entities/image.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { packageincluded } from './PackageInclude.entity';
import { packageinclusion } from './packageInclusion.entitry';
import { tourpackageplan } from './tourpackageplan.entity';
import { packageexcluions } from './packageexclsuions.entity';
import { packagehighlight } from './packagehighlight.entity';
import { bookingpolicy } from './bookingpolicy.entity';
import { refundpolicy } from './refundpolicy.entity';

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
  PackageRefundPolicy: string;
  @Column()
  AlbumTitle: string;
  @Column('json')

  @Column({ default: true })
  Showpackage: boolean;

  @OneToOne(() => image, { cascade: true })
  @JoinColumn({ name: 'cartImage' })
  cartimage: image;

  @OneToOne(() => packageinclusion, { cascade: true })
  @JoinColumn()
  PackageInclusions: packageinclusion;

  @OneToOne(() => packageincluded, { cascade: true })
  @JoinColumn({ name: 'package_included' })
  packageincluded: packageincluded;

  @OneToOne(() => tourpackageplan, { cascade: true })
  @JoinColumn({ name: 'Tour_package_Plan' })
  tourpackageplans: tourpackageplan;

  @OneToOne(() => packageexcluions, { cascade: true })
  @JoinColumn({ name: 'Tour_package_Exclusions' })
  packageExcluions: packageexcluions;

  @OneToOne(() => packagehighlight, { cascade: true })
  @JoinColumn({ name: 'Tour_package_Hightlights' })
  PackageHighlights: packagehighlight;

  @OneToOne(() => bookingpolicy, { cascade: true })
  @JoinColumn({ name: 'Tour_package_BookingPolicy' })
  BookingPolicys: bookingpolicy;


  @OneToOne(() => refundpolicy, { cascade: true })
  @JoinColumn({ name: 'Tour_package_refundpolicy' })
  refundpolicys: refundpolicy;

}
