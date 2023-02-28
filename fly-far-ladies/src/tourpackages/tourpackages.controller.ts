import { bookingpolicy } from './entities/bookingpolicy.entity';


import { AlbumImage } from './entities/albumimage.entity';

// import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
// import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { tourpackage } from 'src/tourpackages/entities/tourpackage.entity';

import {
  Controller,
  Get,
  Post,
  Body,

  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  ParseFilePipeBuilder,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,

} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { diskStorage } from 'multer';
import { CartImage } from './entities/cartimage.entity';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';


// import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
// import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
// import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
// import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
// import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(
    @InjectRepository(AlbumImage) private AlbumimageRepo: Repository<AlbumImage>,
    @InjectRepository(CartImage) private cartmageRepo: Repository<CartImage>,
    @InjectRepository(bookingpolicy) private bookingpolicyRepo: Repository<bookingpolicy>,
    @InjectRepository(tourpackage)
    private travelPackageRepo: Repository<tourpackage>,
    private readonly tourpackagesService: TourpackagesService,
  ) { }

  @Post('AddTravelPackage')
  async create(
    @Body() createTourpackageDto: CreateTourPackageDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const TourPackage = await this.tourpackagesService.create(
      createTourpackageDto,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Travel Package added successfully',TourPackage });
  }

  @Get('AllPackages')
  async findAll() {
    return await this.tourpackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const tourpackage = this.tourpackagesService.findOne(id);
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this = ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return tourpackage;
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateTourpackageDto: UpdateTourpackageDto,
  //   req: Request,
  //   @Res() res: Response,
  // ) {
  //   const updatepackage = await this.tourpackagesService.update(
  //     +id,
  //     updateTourpackageDto,
  //   );
  //   if (!updatepackage) {
  //     throw new HttpException(
  //       `TourPackage not found with this = ${id}`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return res.status(HttpStatus.OK).json({
  //     message: `Tour Package with Id=${id} has updated successfully`,
  //     updatepackage,
  //   });
  // }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const deletePackage = await this.tourpackagesService.remove(+id);
    return res.status(HttpStatus.OK).json({
      deletePackage,
      message: `Tour Package Id=${id} has deleted successfully`,
    });
  }

  @Post(':Id/AddcartImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './CartImages',
        filename: (req, image, callback) => {
          // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
          // const ext = extname(image.originalname)
          const filename = `${image.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async AddImages(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 6,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Param('Id', ParseIntPipe) Id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const newimage = new CartImage();
    newimage.filename = file.filename;
    newimage.destination = file.destination;
    newimage.fieldname = file.fieldname;
    newimage.path = file.path;
    newimage.originalname = file.originalname;
    const updatedpackge = await this.cartmageRepo.save(newimage);
    Tourpackage.cartimages = updatedpackge
    await this.travelPackageRepo.save(Tourpackage);
    return res
      .status(HttpStatus.OK)
      .send({ updatedpackge, message: 'Travel Package cart Image added' });
  }


  @Post(':Id/AddalbumImage')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './AlbumImages',
        filename: (req, image, callback) => {
          // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
          // const ext = extname(image.originalname)
          const filename = `${image.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async AddalbumImages(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 6,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
    @Param('Id', ParseIntPipe) Id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
     }
     const fileArray = [];
     files.forEach((file) => {
       fileArray.push({
         originalname: file.originalname,
         mimetype: file.mimetype,
         filename: file.filename,
         path: file.path,
         size: file.size,
       });
     });
    const newalbum = new AlbumImage();
    newalbum.AlbumImage = fileArray;
    const saveimage = await this.AlbumimageRepo.save(newalbum);
    Tourpackage.albumImages =saveimage
    await this.travelPackageRepo.save(Tourpackage)
    return res.status(HttpStatus.OK).send({ message: "Image  Added Successfully",Tourpackage })
   

    }



    // @Post(':Id/addbookingpolicy')
    // async createBooking(@Body() @Param('Id', ParseIntPipe) Id: number,  @Req() req: Request,createbookingpolicyDto:CreateBookingPolicyDto,@Res() res: Response){
    //   const{policies}=createbookingpolicyDto

    //   const creatpolicy= await this.bookingpolicyRepo.create(createbookingpolicyDto)
    //   await this.bookingpolicyRepo.save(creatpolicy)
    //   const savepolicy= await this.travelPackageRepo.findOne(Id)
    //   if (!savepolicy){
    //     throw new HttpException(
    //       "Tourpolicy not found, cann't add cover image",
    //       HttpStatus.BAD_REQUEST,
    //     );
    //     }
    //   for(const x of policies){
    //     savepolicy.policies.push(x); 
    //   }
    //   await this.travelPackageRepo.save(savepolicy)

     

    //     return res.status(HttpStatus.OK).send({
  
    //             message: 'travel package Inlcluded Iteam Added',
    //           })
    //    }

       
    //     @Body()
    //     createpackageIncludeDto: createPackageIncludeDto,
    //     @Req() req: Request,
    //     @Res() res: Response,
    //   ) {
    //     const packageincluded = this.tourpackagesService.AddpackageIncluded(
    //       id,
    //       createpackageIncludeDto,
    //     );
    //     return res.status(HttpStatus.OK).send({
    //       packageincluded,
    //       message: 'travel package Inlcluded Iteam Added',
    //     });)
    // for (const file of files) {
    //   const newimage = new AlbumImage();
    //   newimage.filename = file.filename;
    //   newimage.destination = file.destination;
    //   newimage.fieldname = file.fieldname;
    //   newimage.path = file.path;
    //   newimage.originalname = file.originalname;
    //   const updatedpackge = await this.imageRepo.save(newimage);
    //   Tourpackage.albumImages = updatedpackge
    //   await this.travelPackageRepo.save(Tourpackage);
    //   return res
    //     .status(HttpStatus.OK)
    //     .send({ updatedpackge, message: 'Travel Package cart Image added' });
    // }

    

   
    // const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    // if (!Tourpackage) {
    //   throw new HttpException(
    //     `TourPackage not found with this id=${Id}, cann't add cover image`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    
    

  

  //   @Post(':id/AddPackageIncluded')
  //   addpackageIncluded(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body()
  //     createpackageIncludeDto: createPackageIncludeDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const packageincluded = this.tourpackagesService.AddpackageIncluded(
  //       id,
  //       createpackageIncludeDto,
  //     );
  //     return res.status(HttpStatus.OK).send({
  //       packageincluded,
  //       message: 'travel package Inlcluded Iteam Added',
  //     });
  //   }

  //   @Post(':id/AddPackageInclusions')
  //   addpackageInclusion(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() packageInclusionsdto: createpackageincluionDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const packageincluded = this.tourpackagesService.AddpackageInclusions(
  //       id,
  //       packageInclusionsdto,
  //     );
  //     return res.status(HttpStatus.OK).json({
  //       packageincluded,
  //       message: 'travel package Inlclusions Iteam Added',
  //     });
  //   }

  //   @Post(':id/AddTourPackagePlan')
  //   addTourPackagePlan(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() tourpackagePlandto: CreateTourPackagePlanDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const tourpackageplan = this.tourpackagesService.AddTourpackagePlan(
  //       id,
  //       tourpackagePlandto,
  //     );
  //     return res.status(HttpStatus.OK).json({
  //       tourpackageplan,
  //       message: 'travel package plan added Iteam Added',
  //     });
  //   }

    @Post(':id/AddTourPackageExclusions')
    async addTourPackageExclusions(
      @Param('id', ParseIntPipe) id: number,
      @Body() packageexcluionsdto: CreatepackageExclsuionsDto,
      @Req() req: Request,
      @Res() res: Response,
    )
    {
      const exclsuions= await this.tourpackagesService.AddpackageExclsuions(
        id,
        packageexcluionsdto,
      );
 
    return res.status(HttpStatus.OK).send({message: "exlsuions  Added Successfully",exclsuions})
    }
     


  //   @Post(':id/AddTourPackageHighlight')
  //   addTourPackageHighlight(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() packageHighlightdto: CreatePackageHighlightDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const tourpackagehighlight = this.tourpackagesService.AddPackageHighlight(
  //       id,
  //       packageHighlightdto,
  //     );
  //     return res.status(HttpStatus.OK).json({
  //       message: 'travel package Highlight added', tourpackagehighlight
  //     });
  //   }


  //   @Post(':id/AddBookingPolicy')
  //   addTourPackageBookingPolicy(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() bookingpolicydto: CreateBookingPolicyDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const tourpackageplan = this.tourpackagesService.AddPackageBookingPolicy(
  //       id,
  //       bookingpolicydto,
  //     );
  //     return res.status(HttpStatus.OK).json({
  //       message: 'travel package booking policy added', tourpackageplan
  //     });
  //   }


  //   @Post(':id/AddrefundPolicy')
  //   addrefundPolicy(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() refundpolicydto: createRefundPolicyDto,
  //     @Req() req: Request,
  //     @Res() res: Response,
  //   ) {
  //     const tourpackageplan = this.tourpackagesService.AddRefundPolicy(
  //       id,
  //       refundpolicydto,
  //     );
  //     return res.status(HttpStatus.OK).json({
  //       message: 'travel package refundpolicy policy added', tourpackageplan
  //     });
  //   }


// async addDataToObject(Id: number, newData: CreatepackageExclsuionsDto): Promise<packageexcluions> {
//     const myData = await this.travelPackageRepo.findOneBy({Id});
//     myData.exclusions.push(newData)
//     return this.travelPackageRepo.save(myData);
//   }

  }