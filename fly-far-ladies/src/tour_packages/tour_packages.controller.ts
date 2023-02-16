import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, ParseFilePipe, UseInterceptors, UploadedFile, Injectable, MaxFileSizeValidator, FileTypeValidator, ParseFilePipeBuilder, UploadedFiles } from '@nestjs/common';
import express, {Request, Response} from 'express';
import { TourPackagesService } from './tour_packages.service';
import { CreateTourPackageDto } from './dto/create-tour_package.dto';
import { UpdateTourPackageDto } from './dto/update-tour_package.dto';
import { CreateCoverImageDto } from './dto/cover-image.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CoverImage } from './entities/image.entity';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';


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

  //cover image 
  @Post(':Id/CoverImage')
  @UseInterceptors(FilesInterceptor('Image',10,{
    storage:diskStorage({
      destination: './CoverImage',
      filename:(req, image, callback)=>{
        // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
        // const ext = extname(image.originalname)
        const filename = `${image.originalname}`;
        callback(null, filename)
      }
    })
    

  }))

  async createCoverImage( 
    @UploadedFiles(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType:  /(jpg|jpeg|png|gif)$/,
      })
      .addMaxSizeValidator({
        maxSize: 9876546
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
    )
    files: Array<Express.Multer.File>,

    @Param('Id', ParseFilePipe)Id:number,
    @Body() createcoverImageDto:CreateCoverImageDto){
    console.log(files);
    return this.tourPackagesService.createCoverImage(Id, createcoverImageDto);
  }

}
