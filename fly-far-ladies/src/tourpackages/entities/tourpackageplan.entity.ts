import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class tourpackageplan {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ type: 'text' })
  dayplan: string;

  @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.tourpackageplans)
  @JoinColumn({ name: 'Tour_package_plan' })
  tourpackage:Tourpackage
 
 
}
