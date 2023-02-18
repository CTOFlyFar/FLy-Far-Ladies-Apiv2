import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class CoverImage{
    @PrimaryGeneratedColumn()
    ImageId:number
    @Column()
    ImageTitle:string
    @Column()
    FileId:number
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
    // @OneToOne(()=>ImageFileDetails)
    // @JoinColumn()
    // ImageFileDetails:ImageFileDetails
   

}