
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { AlbumImage } from './albumimage.entity';
import { bookingpolicy } from './bookingpolicy.entity';
import { CartImage } from './cartimage.entity';
import { packageexcluions } from './packageexclsuions.entity';
import { packagehighlight } from './packagehighlight.entity';
import { packageincluded } from './PackageInclude.entity';
import { Packageinclusion } from './packageInclusion.entitry';
import { refundpolicy } from './refundpolicy.entity';
import { tourpackageplan } from './tourpackageplan.entity';

@Entity()
export class Tourpackage {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
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
  PackageRefundPolicy: string;
  @Column({ default: true })
  Showpackage: boolean;

  @OneToOne(() => CartImage, cartimage => cartimage.tourpackage, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    cascade: true,
    eager: true
  })
  @JoinColumn()
  cartimages: CartImage;
  @OneToOne(() => AlbumImage, albumImage => albumImage.tourpackage, {
    cascade: true,
  })
  @JoinColumn()
  albumImages: AlbumImage;

  @OneToMany(() => packageexcluions, (exclusion) => exclusion.tourpackage, { eager: true, cascade: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  exclusions: packageexcluions;

  @OneToMany(() => bookingpolicy, (policydescription) => policydescription.tourpackage, { eager: true, cascade: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'BookingPolicy' })
  policydescription: bookingpolicy;



  @OneToMany(() => packagehighlight, (highlights) => highlights.tourpackages, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Tour_package_Hightlights' })
  hightlights: packagehighlight;


  @OneToOne(() => Packageinclusion, { cascade: true })
  @JoinColumn()
  PackageInclusions: Packageinclusion;

  @OneToOne(() => packageincluded, { cascade: true })
  @JoinColumn({ name: 'package_included' })
  packageincluded: packageincluded;

  @OneToOne(() => tourpackageplan, { cascade: true })
  @JoinColumn({ name: 'Tour_package_Plan' })
  tourpackageplans: tourpackageplan;

  @OneToOne(() => packageexcluions, { cascade: true })
  @JoinColumn({ name: 'Tour_package_Exclusions' })
  packageExcluions: packageexcluions;




  @OneToOne(() => refundpolicy, { cascade: true })
  @JoinColumn({ name: 'Tour_package_refundpolicy' })
  refundpolicys: refundpolicy;

}
