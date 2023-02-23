import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity} from 'typeorm';

@Entity()
export class packageincluded{
   @PrimaryGeneratedColumn()
   Id:number
   @Column({default:true})
   Flight:string
   @Column({default:true})
   Hotel:string
   @Column({default:true})
   Food:string
   @Column({default:true})
   Transport:string



}