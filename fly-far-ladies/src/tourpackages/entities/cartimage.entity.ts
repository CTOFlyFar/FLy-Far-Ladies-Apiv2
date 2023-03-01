
import { Column, Entity, PrimaryGeneratedColumn, OneToOne,} from 'typeorm';
import { Tourpackage } from './tourpackage.entity';



@Entity()
export class CartImage{
   @PrimaryGeneratedColumn()
   Id: number;
   @Column()
   ImageTitle:string
   @Column()
   path: string;
   @OneToOne(() => Tourpackage, (tourpackage)=>tourpackage.cartimage)
   tourpackage:Tourpackage;
   
}
