import { image } from 'src/image/entities/image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  PackageIncluded: string;
  @Column('text')
  PackageOverview: string;
  @Column('text')
  PackageVisitedPlace: string;
  @Column('text')
  PackageHighlight: string;
  @Column('text')
  PackageTourPlan: string;
  @Column('text')
  PackageInclusion: string;
  @Column()
  CartImage:string
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
  @JoinColumn()
  image:image;
}
