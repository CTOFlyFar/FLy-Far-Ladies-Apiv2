import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class packageincluded {
   @PrimaryGeneratedColumn()
   InId: number
   @Column({ default: true })
   Flight: boolean
   @Column({ default: true })
   Hotel: boolean
   @Column({ default: true })
   Food: boolean
   @Column({ default: true })
   Transport: boolean
   @ManyToOne(() => Tourpackage, (tourpackages) => tourpackages.includes,)
   @JoinColumn({ name: 'package_included' })
   tourpackage: Tourpackage




}