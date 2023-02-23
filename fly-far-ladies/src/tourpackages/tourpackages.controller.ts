

import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, HttpException, ParseIntPipe, UploadedFiles, ParseFilePipeBuilder, UseInterceptors } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import {Request, Response} from 'express';
import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { image } from 'src/image/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { diskStorage } from 'multer';
import { tourpackage } from './entities/tourpackage.entity';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(@InjectRepository(image) private imageRepo: Repository<image>,
  @InjectRepository(tourpackage) private travelPackageRepo: Repository<tourpackage>,
    private readonly tourpackagesService: TourpackagesService) {}

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
  async remove(@Param('id') id: string, @Req() req:Request, @Res() res:Response) {
    const deletepackage= await this.tourpackagesService.remove(+id);
    if(!deletepackage){
      throw new HttpException(`TourPackage not found with this = ${id}`, HttpStatus.BAD_REQUEST)
    }
    return res.status(HttpStatus.OK).json({message:`Tour Package Id=${id} has deleted successfully`, deletepackage})
  }

  @Post(':Id/images')
  @UseInterceptors(FilesInterceptor('images',20,{
    storage: diskStorage({
      destination: './Images',
      filename: (req, image, callback) => {
        // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
        // const ext = extname(image.originalname)
        const filename = `${image.originalname}`;
        callback(null, filename)
      }
    })

  }))
  async AddImages(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024*1024*6
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    files:Express.Multer.File[], @Param("Id", ParseIntPipe) Id:number, creatimagedto:CreateImageDto, @Req() req: Request, @Res() res: Response){ 
      const Tourpackage = await this.travelPackageRepo.findOneBy({Id});
      if(!Tourpackage){
        throw new HttpException("TourPackage not found, cann't add cover image", HttpStatus.BAD_REQUEST)
      }
      for(const file of files){
        const newimage= await this.imageRepo.create(creatimagedto);
        newimage.filename = file.filename
        newimage.destination = file.destination;
        newimage.fieldname = file.fieldname;
        newimage.path =file.path;
        newimage.originalname =file.originalname;
        const saveimages= await this.imageRepo.save(newimage);
        Tourpackage.image = saveimages
        const updatedpackage= this.travelPackageRepo.save(Tourpackage)
        return res.status(HttpStatus.OK).send({updatedpackage,message:"updated travel package with images"}) 
      }  
    }
    
  }

