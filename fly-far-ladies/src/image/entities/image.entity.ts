import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class image {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('json')
  AlbumImage: Array<{
    originalname: string;
    mimetype: string;
    filename: string;
    path: string;
    size: number;
  }>
  // @ManyToOne(()=>tourpackage,(tourpackage)=>tourpackage.images)
  // tourpackages:tourpackage;
}
