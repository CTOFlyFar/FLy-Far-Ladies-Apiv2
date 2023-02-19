
import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TourPackage {
    @PrimaryGeneratedColumn ()
    Id:number
    @Column()
    PkId:string
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
    TourPlan:string
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
    @Column()
    HighlightsBN:string
    @Column()
    HighlightsEN:string
    @Column()
    TourPlanBN :string
    @Column()
    TourPlanEN :string
    @Column()
    PriceEN:number
    @Column()
    PriceBN:number
    @Column()
    BookNowBN:string
    @Column()
    BookNowWEN:string
    @Column()
    ExclusionEN: string
    @Column()
    ExclusionBN: string
    @Column()
    PlaceVisitEN: string
    @Column()
    PlaceVisitBN: string
    @Column()
    DetailsEN: string
    @Column()
    DetailsBN: string
    @Column()
    BookingPolicyEN: string
    @Column()
    BookingPolicyBN: string
    @Column()
    RefundPolicyEN: string
    @Column()
    RefundPolicyBN: string
    @Column()
    TermsEN:string
    @Column()
    TermsBN: string
    @Column()
    OverviewBN:string
    @Column()
    OverviewEN:string
    @Column()
    IncludesBN:string
    @Column()
    IncludesEN:string
}
