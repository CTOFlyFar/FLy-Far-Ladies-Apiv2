import { IsNotEmpty } from '@nestjs/class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class VisitedPalce{
   @PrimaryGeneratedColumn()
   Id:number
   @IsNotEmpty({message:"please give place number"})
   @Column()
   PlaceName:string
   @Column()
   fieldname: string;
   @Column()
   originalname: string;
   @Column()
   destination: string;
   @Column()
   filename: string;
   @Column()
   path: string;
   @ManyToOne(() => Tourpackage, tourpackage=>tourpackage.vistitedImages)
   @JoinColumn({name:'vistited image'})
   tourpackage:Tourpackage;
}