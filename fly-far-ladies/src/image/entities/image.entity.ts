


import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


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
    // @ManyToOne(() => tourpackage, (tourpackage) => tourpackage.images)
    // @JoinColumn({ name: 'id_datasource' })
    // coverimage: tourpackage
}