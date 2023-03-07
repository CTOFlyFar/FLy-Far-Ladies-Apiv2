
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { CreateTravellerDto } from "./Dto/create-traveller.dto";
import { TravellerServices } from './traveller.services';
import { Request, Response } from 'express';
import { updateTravellerDto } from "./Dto/update-traveller.dto";


@Controller('Traveller')
export class TravellerController{
   constructor( private readonly travellerServices:TravellerServices){}

   // Add Traveller
   @Post('addtraveller')
   async AddTraveller(
      @Body() travellerDto:CreateTravellerDto,
      @Req() req: Request,
      @Res() res: Response){
      await this.travellerServices.AddTraveller(travellerDto)
      return res.status(HttpStatus.CREATED).json({message:'Traveller Added successfully'});
   }
  

   // all user
   
   @Get('Alltraveller')
   async FindAll(
      @Req() req: Request,
      @Res() res: Response){
         const traveller = await this.travellerServices.FindAllTraveller();
         return res.status(HttpStatus.OK).json({traveller});
   }

   // // get user dashbboard
   @Get(':id')
   async TravellerDashboard(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response){
         const traveller = await this.travellerServices.FindTrveller(id);
         return res.status(HttpStatus.OK).json({traveller});
   }

   @Patch(':id')
   async updateTraveller(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response,
      @Body() travellerupdatedto:updateTravellerDto){
         await this.travellerServices.UpdateTravller(id,travellerupdatedto)
         return res.status(HttpStatus.OK).json({message:'traveller updated successfully'});
      }

   @Delete(':id')
   async DeleteTraveller(
      @Param('id') id:string,
      @Req() req: Request,
      @Res() res: Response ){
         await this.travellerServices.DeleteTraveller(id)
         return res.status(HttpStatus.OK).json({message:'traveller has deleted'});
      }

}