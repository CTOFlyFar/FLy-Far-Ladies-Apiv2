import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class CoverImage{
    @PrimaryGeneratedColumn()
    ImageId:number
    @Column()
    ImageTitle:string
    @Column()
    Image:Buffer
    

}