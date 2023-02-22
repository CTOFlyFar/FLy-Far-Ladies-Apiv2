


import { tourpackage } from "src/tourpackages/entities/tourpackage.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    Id:number
    @Column()
    ImageTitle:string
    @Column()
    fieldname:string
    @Column()
    originalname:string
    @Column()
    destination:string
    @Column()
    filename:string
    @Column()
    path: string
    @Column() 
    size:string
}