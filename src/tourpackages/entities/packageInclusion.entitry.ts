
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class Packageinclusion {
  @PrimaryGeneratedColumn()
  InId: number;

  @Column({type:'text'})
  inclusions:string

  @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.PackageInclusions)
  @JoinColumn({name:'inclusionId'})
  tourpackage:Tourpackage

  
}
