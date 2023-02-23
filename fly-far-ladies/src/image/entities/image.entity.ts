import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class image {
  @PrimaryGeneratedColumn()
  Id: number;
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
  size: string;
  // @ManyToOne(()=>tourpackage,(tourpackage)=>tourpackage.images)
  // tourpackages:tourpackage;
}
