import { Column, Entity,PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { tourpackage } from './tourpackage.entity';



@Entity()
export class packageexcluions {
  @PrimaryGeneratedColumn()
  exclusionsId: number;
  @Column()
  PackageExclusions: string;

  @OneToOne(()=>tourpackage, tourpackage=>tourpackage.exclusions)
  tourpackage:tourpackage;
 
}