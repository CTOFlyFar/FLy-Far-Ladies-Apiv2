import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class packagehighlight {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  highlight: string
  @ManyToOne(() => Tourpackage, (tourpackages) => tourpackages.hightlights)
  tourpackages: Tourpackage

}