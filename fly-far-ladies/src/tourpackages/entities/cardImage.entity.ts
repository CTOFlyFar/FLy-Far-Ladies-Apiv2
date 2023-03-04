import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tourpackage } from "./tourpackage.entity";


@Entity()
export class CardImage{
   @PrimaryGeneratedColumn()
   CarrdId:number
   @Column()
   CardTitle:string
   @Column()
   Path:string
   Filename:string
   @OneToOne(()=>Tourpackage, (tourpackage)=>tourpackage.cardimage)
   cardimage:Tourpackage
}