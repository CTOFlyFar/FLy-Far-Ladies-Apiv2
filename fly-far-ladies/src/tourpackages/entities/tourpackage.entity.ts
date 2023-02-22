

import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tourpackage {
    @PrimaryGeneratedColumn()
    Id:number;
    @Column({unique:true})
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
    TotalDuration:string;
    @Column('text')
    PackageIncluded:string;
    @Column('text')
    PackageOverview:string;
    @Column('text')
    PackageVisitedPlace:string;
    @Column('text')
    PackageHighlight:string;
    @Column('text')
    PackageTourPlan:string;
    @Column('text')
    PackageInclusion:string;
    @Column()
    PackageExclusion:string;
    @Column('text')
    PackageBookingPolicy:string;
    @Column('text')
    PackageRefundPolicy:string;
    @Column()
    AlbumTitle:string;
    @Column()
    AlbumImage:string;
    @Column('boolean', {default: true})
    Showpackage:boolean;

}
