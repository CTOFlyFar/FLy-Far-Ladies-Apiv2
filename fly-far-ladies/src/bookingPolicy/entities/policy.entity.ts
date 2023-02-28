import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class BookingPolicy {
   @PrimaryGeneratedColumn()
   Id:number
   @Column()
   policy:string
}
