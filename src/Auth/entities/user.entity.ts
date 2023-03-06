import { IsEmail } from "@nestjs/class-validator"
import { IsNotEmpty } from "class-validator"
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class User{
   @PrimaryColumn({type:"uuid"})
   @Generated("uuid")
   Id:string
   @IsNotEmpty()
   @Column()
   NameTitle:string
   @IsNotEmpty()
   @Column()
   Fname:string
   @IsNotEmpty()
   @Column()
   Lname:string
   @IsEmail()
   @IsNotEmpty()
   @Column()
   Email:string
   @IsNotEmpty()
   @Column()
   Password:string
   @IsNotEmpty()
   @Column()
   DOB:string
   @IsNotEmpty()
   @Column()
   Gender:string
   @IsNotEmpty()
   @Column()
   Profession:string
   @IsNotEmpty()
   @Column()
   Nationality:string
   @IsNotEmpty()
   @Column()
   NID:string
   @Column()
   Address:string
   @Column({nullable:true})
   jwtToken:string
   @CreateDateColumn()
   CreatedAt:Date
   @UpdateDateColumn()
   UpdatedAt:Date
}