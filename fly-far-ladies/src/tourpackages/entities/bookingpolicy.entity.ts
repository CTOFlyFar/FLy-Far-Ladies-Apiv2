import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';



@Entity()
export class bookingpolicy {
    @PrimaryGeneratedColumn()
    Id: number
    @Column()
    description:string;
    @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.BookingPolicys)
    @JoinColumn({name:'policyId'})
    tourpackage:Tourpackage
   
}

