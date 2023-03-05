


import { IsNotEmpty } from '@nestjs/class-validator';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { AlbumImage } from './albumimage.entity';
import { bookingpolicy } from './bookingpolicy.entity';
import { CardImage } from './cardImage.entity';
import { packageexcluions } from './packageexclsuions.entity';
import { packagehighlight } from './packagehighlight.entity';
import { packageincluded } from './PackageInclude.entity';
import { Packageinclusion } from './packageInclusion.entitry';
import { refundpolicy } from './refundpolicy.entity';
import { tourpackageplan } from './tourpackageplan.entity';
import { VisitedPalce } from './visitedplace.entity';

@Entity()
export class Tourpackage {
  @PrimaryGeneratedColumn()
  Id: number;
  @IsNotEmpty({message:"Please enter PkId"})
  @Column()
  PkId: string;
  @Column()
  @IsNotEmpty()
  MainTitle: string;
  @Column()
  @IsNotEmpty()
  SubTitle: string;
  @IsNotEmpty()
  @Column()
  Price: string;
  @IsNotEmpty()
  @Column()
  Location: string;
  @Column()
  StartDate: string;
  @IsNotEmpty()
  @Column()
  EndDate: string;
  @IsNotEmpty()
  @Column()
  TripType: string;
  @IsNotEmpty()
  @Column({ default: true })
  Availability: boolean;
  @IsNotEmpty()
  @Column()
  TotalDuration: string;
  @IsNotEmpty()
  @Column('text')
  PackageOverview: string;
  @IsNotEmpty()
  @Column({ default: true })
  Showpackage: boolean;

  @OneToMany(() => CardImage, (cardimage)=>cardimage.tourpackage, {eager:true, onDelete: 'CASCADE',
  onUpdate: "RESTRICT"})
  cardimage:CardImage;
  @OneToMany(() => AlbumImage, (albumImage) => albumImage.tourpackage,{eager:true,
  onUpdate: "RESTRICT",
  cascade: true,})
  @JoinColumn({name:'album image'})
  albumImages: AlbumImage;

  @OneToMany(() => VisitedPalce, (albumImage) => albumImage.tourpackage,{eager:true, cascade:false, onDelete: "RESTRICT",
  onUpdate: "RESTRICT"}) 
  vistitedImages: VisitedPalce;

  @OneToMany(() =>packageexcluions, (exclusion)=>exclusion.tourpackage, {eager:true, cascade:false, onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  exclusions: packageexcluions;

  @OneToMany(() => Packageinclusion, (inclsuions)=>inclsuions.tourpackage, { eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  PackageInclusions: Packageinclusion;

  @OneToMany(() => bookingpolicy, (policy)=>policy.tourpackage,{ eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  BookingPolicys: bookingpolicy;

  @OneToMany(() => packagehighlight, (highlights)=>highlights.tourpackage,{ eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  highlights: packagehighlight;

  @OneToMany(() => packageincluded, (includes)=>includes.tourpackage,{ eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"} )
  includes: packageincluded;

  @OneToMany(() => refundpolicy, (refundpolicy)=>refundpolicy.tourpackage,{ eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  refundpolicys: refundpolicy;

  @OneToMany(() => tourpackageplan, (dayplans)=>dayplans.tourpackage, {eager:true,onDelete: "RESTRICT",
  onUpdate: "RESTRICT"})
  tourpackageplans: tourpackageplan;

}
