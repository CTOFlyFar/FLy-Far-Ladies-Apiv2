import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class bookingpolicy {
    @PrimaryGeneratedColumn()
    Id: number
    @Column()
    description:string;
    @Column({type:'simple-array'})
    policies:string[];
   
}

