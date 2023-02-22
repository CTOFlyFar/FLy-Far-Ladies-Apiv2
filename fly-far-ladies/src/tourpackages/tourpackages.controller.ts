import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, HttpException } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import {Request, Response} from 'express';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(private readonly tourpackagesService: TourpackagesService) {}

  @Post('AddTravelPackage')
  async create(@Body() createTourpackageDto: CreateTourPackageDto,@Req() req:Request, @Res() res:Response ) {
    const TourPackage=  await this.tourpackagesService.create(createTourpackageDto);
    return res.status(HttpStatus.CREATED).json({message:"Tour Package added successfully", TourPackage})
  }

  @Get('AllPackages')
  async findAll() {
    return await this.tourpackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const tourpackage=this.tourpackagesService.findOne(+id);
    if(!tourpackage){
      throw new HttpException(`TourPackage not found with this = ${id}`, HttpStatus.BAD_REQUEST)
    }
    return tourpackage;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTourpackageDto: UpdateTourpackageDto, req:Request, @Res() res:Response) {
    const updatepackage= await this.tourpackagesService.update(+id, updateTourpackageDto);
    if(!updatepackage){
      throw new HttpException(`TourPackage not found with this = ${id}`, HttpStatus.BAD_REQUEST)
    }
    return res.status(HttpStatus.OK).json({message:`Tour Package with Id=${id} has updated successfully`, updatepackage})
  }

  @Delete(':id')
  async remove(@Param('id') id: string,req:Request, @Res() res:Response) {
    const deletepackage= await this.tourpackagesService.remove(+id);
    if(!deletepackage){
      throw new HttpException(`TourPackage not found with this = ${id}`, HttpStatus.BAD_REQUEST)
    }
    return res.status(HttpStatus.OK).json({message:`Tour Package Id=${id} has deleted successfully`, deletepackage})
  }
}
