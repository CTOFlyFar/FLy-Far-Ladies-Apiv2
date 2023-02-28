import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';




@Entity()
export class packageexcluions {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  name: string
  @Column()
  PackageExclusions: string;
  @ManyToOne(() => Tourpackage, (tourpackages) => tourpackages.exclusions, { cascade: true })
  tourpackage: Tourpackage;

}

