import { CoverImage } from "src/tour_packages/entities/image.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TourPackage {
    @PrimaryGeneratedColumn()
    Id:number
    @Column({unique:true})
    PkId:string
    @OneToOne(()=>CoverImage)
    @JoinColumn()
    CoverImage:CoverImage
    @Column()
    Title:string
    @Column()
    SubTitle:string
    @Column()
    Location:string
    @Column()
    StartDate:string
    @Column()
    EndDate:string
    @Column()
    ShortDescription:string
    @Column()
    Overview:string
    @Column()
    Includes:string
    @Column()
    VisitedImages:string 
    @Column()
    Highlights:string
    @Column()
    TourPlan :string
    @Column()
    Price:number
    @Column()
    Duration:string
    @Column()
    BookNow:string
    @Column()
    WishList:string
    @Column()
    @CreateDateColumn()
    CreatedAt:Date
    @Column()
    @UpdateDateColumn()
    UpdatedAt:Date

   
    




}
