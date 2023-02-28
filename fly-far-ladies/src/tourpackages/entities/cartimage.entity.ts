
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';



@Entity()
export class CartImage{
   @PrimaryGeneratedColumn()
   cartId: number;
 
   // @Column('json')
   // AlbumImage: Array<{
   //   originalname: string;
   //   mimetype: string;
   //   filename: string;
   //   path: string;
   //   size: number;
   // }>

   @Column()
   ImageTitle: string;
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
   @Column()
   size: string
   @OneToOne(() => Tourpackage, tourpackage=>tourpackage.cartimages)
   tourpackage:Tourpackage
   
}
