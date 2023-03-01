import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class VisitedPalce{
   @PrimaryGeneratedColumn()
   Id:number
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