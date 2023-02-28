
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AlbumImage } from './albumimage.entity';
import { CartImage } from './cartimage.entity';
import { packageexcluions } from './packageexclsuions.entity';

@Entity()
export class tourpackage {
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

  // @Column({type:'json'})
  // Tourplan:string[];

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

  @Column({ default: true })
  Showpackage: boolean;
  @Column('simple-array')
  policies:{
    name:string
    description:string
  }

  @OneToOne(() => CartImage, cartimage => cartimage.tourpackage, { onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  cascade: true,})
  @JoinColumn()
  cartimages: CartImage;

  @OneToOne(() => AlbumImage, albumImage => albumImage.tourpackage,{
  cascade: true,})
  @JoinColumn()
  albumImages: AlbumImage;

  @OneToMany(() =>packageexcluions, (exclusion)=>exclusion.tourpackage, {eager:true, cascade:false})
  // @JoinColumn({name:'Id', referencedColumnName:'Id'})
  exclusions: packageexcluions[];



  // @OneToOne(() => packageinclusion, { cascade: true })
  // @JoinColumn()
  // PackageInclusions: packageinclusion;

  // @OneToOne(() => packageincluded, { cascade: true })
  // @JoinColumn({ name: 'package_included' })
  // packageincluded: packageincluded;

  // @OneToOne(() => tourpackageplan, { cascade: true })
  // @JoinColumn({ name: 'Tour_package_Plan' })
  // tourpackageplans: tourpackageplan;

  // @OneToOne(() => packageexcluions, { cascade: true })
  // @JoinColumn({ name: 'Tour_package_Exclusions' })
  // packageExcluions: packageexcluions;

  // @OneToOne(() => packagehighlight, { cascade: true })
  // @JoinColumn({ name: 'Tour_package_Hightlights' })
  // PackageHighlights: packagehighlight;

  // @OneToOne(() => bookingpolicy, { cascade: true })
  // @JoinColumn({ name: 'Tour_package_BookingPolicy' })
  // BookingPolicys: bookingpolicy;


  // @OneToOne(() => refundpolicy, { cascade: true })
  // @JoinColumn({ name: 'Tour_package_refundpolicy' })
  // refundpolicys: refundpolicy;

}
