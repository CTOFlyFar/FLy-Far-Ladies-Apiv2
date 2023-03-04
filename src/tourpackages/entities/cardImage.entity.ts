import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Tourpackage } from "./tourpackage.entity";


@Entity()
export class CardImage{
   @PrimaryGeneratedColumn()
   CardId:number
   @Column()
   CardTitle:string
   @Column()
   Path:string
   @Column()
   Filename:string
   @ManyToOne(()=>Tourpackage, (tourpackage)=>tourpackage.cardimage)
   @JoinColumn({name:'cardImage'})
   tourpackage:Tourpackage
}