
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tourpackage } from './tourpackage.entity';

@Entity()
export class AlbumImage{
   @PrimaryGeneratedColumn()
   AlbumId: number;
   @Column()
   AlbumTitle: string;
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

   @ManyToOne(() => Tourpackage, tourpackage=>tourpackage.albumImages)
   tourpackage:Tourpackage;
   
}
