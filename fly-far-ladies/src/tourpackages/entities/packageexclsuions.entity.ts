import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,} from 'typeorm';
import { tourpackage } from './tourpackage.entity';




@Entity()
export class packageexcluions {
  @PrimaryGeneratedColumn()
  exclusionsId: number;
  @Column({nullable:false})
  Id:number
  @Column()
  name:string
  @Column()
  PackageExclusions: string;
  @ManyToOne(()=>tourpackage, (tourpackages)=>tourpackages.exclusions,{ cascade:true})
  @JoinColumn({name : 'post_id'})
  tourpackage:tourpackage;
 
}