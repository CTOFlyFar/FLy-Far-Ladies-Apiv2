
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class packageinclusion {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({type:'text'})
  inclusions:string

  @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.PackageInclusions)
  @JoinColumn({name:'inclusionId'})
  tourpackage:Tourpackage

  
}
