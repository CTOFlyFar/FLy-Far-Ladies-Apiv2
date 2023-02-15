import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TourPackage {
    @PrimaryGeneratedColumn()
    Id:number
    @Column({unique:true})
    PkId:string
    @Column()
    CoverImage:string
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
