
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';




@Entity()
export class bookingpolicy {
    @PrimaryGeneratedColumn()
    Id: number
    @Column()
    description:string;

    @ManyToOne(()=>Tourpackage, (tourpackages)=>tourpackages.policydescription)
    tourpackage:Tourpackage
   
}

