import { Column, Entity, OneToMany,PrimaryGeneratedColumn } from "typeorm";
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
   @OneToMany(()=>Tourpackage, (tourpackage)=>tourpackage.cardimage)
   cardimage:Tourpackage
}