import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';


@Entity()
export class refundpolicy {

    @PrimaryGeneratedColumn()
    Id: number
    @Column()
    RefundPolicy:string
    @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.refundpolicys)
    @JoinColumn({ name: 'Tour_package_refundpolicy' })
    tourpackage:Tourpackage;
   
}