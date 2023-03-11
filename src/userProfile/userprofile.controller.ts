
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { CreateUserProfileDto } from "./Dto/create-userprofile.dto";
import { updateUserProfileDto } from "./Dto/update-userprofile.dto";
import { UserProfileServices } from "./userprofile.services";



@Controller('userProfile')
export class userProfileController{
   constructor( private readonly UserProfileServices:UserProfileServices){}

   // Add Traveller
   @Post('addProfile')
   async AddTraveller(
      @Body() UserprofileDto:CreateUserProfileDto,
      @Req() req: Request,
      @Res() res: Response){
      await this.UserProfileServices.AddProfile(UserprofileDto)
      return res.status(HttpStatus.CREATED).json({message:'user Profile Added successfully'});
   }
  

   // all user
   
   @Get('AllProfile')
   async FindAll(
      @Req() req: Request,
      @Res() res: Response){
         const Profile = await this.UserProfileServices.FindAllProfile();
         return res.status(HttpStatus.OK).json({Profile});
   }

   // // get user dashbboard
   @Get(':id')
   async TravellerDashboard(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response){
         const traveller = await this.UserProfileServices.FindProfile(id);
         return res.status(HttpStatus.OK).json({traveller});
   }

   @Patch(':id')
   async updateTraveller(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response,
      @Body() Userprofileupdatedto:updateUserProfileDto){
         await this.UserProfileServices.UpdateProfile(id,Userprofileupdatedto)
         return res.status(HttpStatus.OK).json({message:'traveller updated successfully'});
      }

   @Delete(':id')
   async DeleteTraveller(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response ){
         await this.UserProfileServices.DeleteProfile(id)
         return res.status(HttpStatus.OK).json({message:'traveller has deleted'});
      }

}