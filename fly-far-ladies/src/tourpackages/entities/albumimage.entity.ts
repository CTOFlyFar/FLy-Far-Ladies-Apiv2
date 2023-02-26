
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { tourpackage } from './tourpackage.entity';

// import { tourpackage } from './tourpackage.entity';


@Entity()
export class AlbumImage{
   @PrimaryGeneratedColumn()
   AlbumId: number;

   @Column('simple-json')
   AlbumImage: Array<{
     originalname: string;
     mimetype: string;
     filename: string;
     path: string;
     size: number;
   }>

   // @Column()
   // ImageTitle: string;
   // @Column()
   // fieldname: string;
   // @Column()
   // originalname: string;
   // @Column()
   // destination: string;
   // @Column()
   // filename: string;
   // @Column()
   // path: string;
   // @Column()
   // size: string

   @OneToOne(() => tourpackage, tourpackage=>tourpackage.albumImages)
   tourpackage:tourpackage;
   
}
