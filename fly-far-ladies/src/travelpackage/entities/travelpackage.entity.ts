import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';


@Entity()
export class Travelpackage {
   @PrimaryGeneratedColumn()
   Id:number;
   @Column()
   PkId:string;
   @Column()
   MainTitle:string;
   @Column()
   SubTitle:string;
   @Column()
   Price:string;
   @Column()
   Location:string;
   @Column()
   StartDate:string;
   @Column()
   EndDate:string;
   @Column()
   TripType:string;
   @Column()
   Availability:boolean;
   @Column()
   TotalDuration:string;
   @Column()
   PackageOverview:string;
}
