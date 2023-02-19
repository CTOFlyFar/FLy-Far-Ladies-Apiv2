import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    ImageId:number
    @Column()
    ImageTitle:string
    @Column()
    FileId:string
    @Column()
    fieldname:string
    @Column()
    originalname:string
    @Column()
    encoding:string
    @Column()
    destination:string
    @Column()
    filename:string
    @Column()
    path: string 
    @Column()
    size:string
}
