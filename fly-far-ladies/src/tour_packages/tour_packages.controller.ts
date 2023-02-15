import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import express, {Request, Response} from 'express';
import { TourPackagesService } from './tour_packages.service';
import { CreateTourPackageDto } from './dto/create-tour_package.dto';
import { UpdateTourPackageDto } from './dto/update-tour_package.dto';
import { user } from 'firebase-functions/v1/auth';
import { TourPackage } from './entities/tour_package.entity';


@Controller('tour-packages')
export class TourPackagesController {
  constructor(private readonly tourPackagesService: TourPackagesService) {}

  @Post('AddPackage')
  async create(@Body() createTourPackageDto: CreateTourPackageDto, @Req() req:Request, @Res() res:Response) {
    const TourPackage = await this.tourPackagesService.create(createTourPackageDto);
    return res.status(HttpStatus.CREATED).send({ message:"Tour Package added successfully",TourPackage})
  }

  @Get('AllPackages')
  findAll() {
    return this.tourPackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const travelpackage= this.tourPackagesService.findOne(+id);
    return travelpackage;

  }
  
  @Get(':id')
  async findOneByPkId(@Param('id') id:string){
    const travelpackage= await this.tourPackagesService.findOneByPkId(id);
    return travelpackage;

  }


  @Patch(':Id')
  async update(@Param('Id') Id: number, @Body() updateTourPackageDto: UpdateTourPackageDto, @Req() req:Request, @Res() res:Response) {
    const updatepackage = await this.tourPackagesService.update(+Id, updateTourPackageDto);
    return res.status(HttpStatus.OK).send({ message:"Tour Package has updated successfully", updatepackage})
  }

  @Delete(':Id')
  async remove(@Param('Id') Id: string, @Req() req:Request, @Res() res:Response) {
    const deletePackage= await this.tourPackagesService.remove(Id);
    return res.status(HttpStatus.OK).send({deletePackage, message:"Tour Package has deleted successfully"})
  }
}
