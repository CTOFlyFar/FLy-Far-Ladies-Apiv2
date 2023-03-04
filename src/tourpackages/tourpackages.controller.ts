
import { AlbumImage } from './entities/albumimage.entity';
import { Tourpackage } from 'src/tourpackages/entities/tourpackage.entity';
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
  UploadedFiles,
  Patch,

} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { VisitedPalce } from './entities/visitedplace.entity';
import { updateBookingPolicyDto } from './dto/update-bookingpolicy.dto';
import { UpdateRefundPolicy } from './dto/update-refundpolicy.dto';
import { updatepackageInclusionDto } from './dto/update-packageincluion.dto';
import { CardImage } from './entities/cardImage.entity';
import { updatepackageExclusionsDto } from './dto/update-packageexclsuions.dto';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(
    //Repository
    @InjectRepository(AlbumImage) private VisitedmageRepo: Repository<AlbumImage>,
    @InjectRepository(VisitedPalce) private AlbumimageRepo: Repository<AlbumImage>,
    @InjectRepository(CardImage) private CardmageRepo: Repository<CardImage>,
    @InjectRepository(Tourpackage) private travelPackageRepo: Repository<Tourpackage>,
    private readonly tourpackagesService: TourpackagesService,
  
  ) {}

  //start travel package 
  @Post('AddTravelPackage')
  async create(
    @Body() createTourpackageDto: CreateTourPackageDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
     await this.tourpackagesService.Addtravelcreate(
      createTourpackageDto,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Travel Package added successfully'});
  }

  @Get('AllPackages')
  async findAll() {
    return await this.tourpackagesService.findAllTravelpackage();
  }


@Get(':id')
 async findOne(@Param('id') id: number) {
    const tourpackage = await this.tourpackagesService.findOnePackage(id);
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this = ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return tourpackage;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTourpackageDto: UpdateTourpackageDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updatepackage = await this.tourpackagesService.updatePackage(
      +id,
      updateTourpackageDto,
    );
    if (!updatepackage) {
      throw new HttpException(
        `TourPackage not found with this = ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return res.status(HttpStatus.OK).json({
      message: `Tour Package with Id=${id} has updated successfully`,
      updatepackage,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const deletePackage = await this.tourpackagesService.removepackage(+id);
    return res.status(HttpStatus.OK).json({
      deletePackage,
      message: `Tour Package Id=${id} has deleted successfully`,
    });
  }


@Get(':id/getpolicy/:BkId')
 async getsingleBookingPolicy(
  @Param('id') id: number,
  @Param('BkId') BkId: number,
  @Req() req: Request,
  @Res() res: Response)
  {
   const  bookingpolicy= await this.tourpackagesService.FindbookingPolicy(id,BkId)
   return res.status(HttpStatus.OK).json({
    message: `booking policy with this Id=${BkId} is`,bookingpolicy,
  });
  }

  
  
// update booking policy  
  @Patch(':id/updatepolicy/:BkId')
  async updateBookingPolicy(
    @Param('id') id: number,
    @Param('BkId') BkId: number,
    @Body() updatebookingpolicyDto: updateBookingPolicyDto,
    req: Request,
    @Res() res: Response,
  ) {
    const updatebooking = await this.tourpackagesService.updateBookingolicy(id,BkId,updatebookingpolicyDto)
    return res.status(HttpStatus.OK).json({
      message: `Booking policy with Id=${BkId} has updated successfully`,
      updatebooking,
    });
  }

  @Delete(':id/deletepolicy/:BkId')
 async DeleteBookingPolicy(
  @Param('id') id: number,
  @Param('BkId') BkId: number,
  @Req() req: Request,
  @Res() res: Response)
  {
   await this.tourpackagesService.DeletebookingPolicy(id,BkId)
   return res.status(HttpStatus.OK).json({
    message: `booking policy Id=${BkId} has deleted successfully`,
  });
  }

// booking policy end

//refund policy start
  @Get(':id/getrefundpolicy/:RId')
  async getsinglerefundPolicy(
   @Param('id') id: number,
   @Param('RId') RId: number,
   @Req() req: Request,
   @Res() res: Response)
   {
    const  bookingpolicy= await this.tourpackagesService.FindRefundPolicy(id,RId)
    return res.status(HttpStatus.OK).json({
     message: `refund policy with this Id=${RId} is`,bookingpolicy,
   });
   }

   // update refund policy  
  @Patch(':id/updateRefundpolicy/:RId')
  async updateRefundPolicy(
    @Param('id') id: number,
    @Param('RId') RId: number,
    @Body() updateRefundlicyDto: UpdateRefundPolicy,
    req: Request,
    @Res() res: Response,
  ) {
    const updatebooking = await this.tourpackagesService.updateRefundolicy(id,RId,updateRefundlicyDto)
    return res.status(HttpStatus.OK).json({
      message: `refund policy with Id=${RId} has updated successfully`,
      updatebooking,
    });
  }


  // delete refund policy
  @Delete(':id/deleteRefundpolicy/:RId')
 async DeleteRefundPolicy(
  @Param('id') id: number,
  @Param('RId') RId: number,
  @Req() req: Request,
  @Res() res: Response)
  {
   await this.tourpackagesService.DeleterefundPolicy(id,RId)
   return res.status(HttpStatus.OK).json({
    message: `refund policy Id=${RId} has deleted successfully`,
  });
}

// refund policy End

// Inclusions  start

// add inclsuions
@Post(':id/AddPackageInclusions')
addpackageInclusion(
  @Param('id', ParseIntPipe) id: number,
  @Body() packageInclusionsdto: createpackageincluionDto,
  @Req() req: Request,
  @Res() res: Response,
) {
  const packageincluded = this.tourpackagesService.AddpackageInclusions(
    id,
    packageInclusionsdto,
  );
  return res.status(HttpStatus.OK).json({
    packageincluded,
    message: 'travel package Inlclusions Iteam Added',
  });
}

// get Singel Inclsuions

@Get(':id/getinclsuions/:InId')
async getsingleInclsuions(
 @Param('id') id: number,
 @Param('InId') InId: number,
 @Req() req: Request,
 @Res() res: Response)
 {
  const inclsuions= await this.tourpackagesService.FindInclsuions(id,InId)
  return res.status(HttpStatus.OK).json({
   message: `Inclusions with this Id=${InId} is`,inclsuions,
 });
 }


   // update refund policy  
   @Patch(':id/updateInclsuions/:InId')
   async updateInclsuions(
     @Param('id') id: number,
     @Param('InId') InId: number,
     @Body() updateInclusionsDto: updatepackageInclusionDto,
     req: Request,
     @Res() res: Response,
   ) {
     const updatebooking = await this.tourpackagesService.updateInclusions(id,InId,updateInclusionsDto)
     return res.status(HttpStatus.OK).json({
       message: `Inclsuions with Id=${InId} has updated successfully`,
       updatebooking,
     });
   }


  // delete Inclsuions
  @Delete(':id/deleteinclusions/:InId')
 async DeleteExcluions(
  @Param('id') id: number,
  @Param('InId') InId: number,
  @Req() req: Request,
  @Res() res: Response)
  {
   await this.tourpackagesService.DeleteInclusion(id,InId)
   return res.status(HttpStatus.OK).json({
    message:`Inclusion Id=${InId} has deleted successfully`,
  });
}

//End refund policy


  @Post(':Id/AddcartImage')
  @UseInterceptors(
    FilesInterceptor('image',10,{
      storage: diskStorage({
        destination: './CardImages',
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
    @Body() body,
    @Res() res: Response,
  ) {
    const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }

    for(const file of files){
      const newalbum = new CardImage();
      newalbum.Path =file.path
      newalbum.Filename =file.filename
      newalbum.CardTitle =req.body.CardTitle
      await this.CardmageRepo.save({...newalbum, tourpackage})
    }
    return res.status(HttpStatus.OK).send({message: "album Image  Added Successfully",})
    }
  /// end adding card image

// find card image



@Get(':id/cardImage/:CardId')
async getCardeImage(
 @Param('id') id: number,
 @Param('CardId') CardId: number,
 @Req() req: Request,
 @Res() res: Response)
 {
  const cardimage= await this.tourpackagesService.FindCardImage(id,CardId)
  return res.status(HttpStatus.OK).json({
   message: `card image with this Id=${CardId} is`,
   cardimage,
 });
 }


 @Get(':id/cardImage/allcardimage')
async getAllCardeImage(
 @Param('id') id: number,
 @Req() req: Request,
 @Res() res: Response)
 {
  const cardimage= await this.tourpackagesService.FindAllCardImage(id)
  return res.status(HttpStatus.OK).json({
   message: `card images`,
   cardimage,
 });
 }

  @Post(':Id/AddalbumImage')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './AlbumImages',
        filename: (req, image, callback) => {
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
    const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
     }
  
    for(const file of files){
      const newalbum = new AlbumImage();
      newalbum.path =file.path
      newalbum.destination =file.destination
      newalbum.filename =file.filename
      newalbum.fieldname =file.fieldname
      newalbum.AlbumTitle =req.body.AlbumTitle
      await this.VisitedmageRepo.save({...newalbum, tourpackage})
    }
    return res.status(HttpStatus.OK).send({message: "album Image  Added Successfully",Tourpackage })
    }
  



    @Post(':Id/AddvistitedImages')
    @UseInterceptors(
      FilesInterceptor('images', 20, {
        storage: diskStorage({
          destination: './vistitedplaceimages',
          filename: (req, image, callback) => {
            // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
            // const ext = extname(image.originalname)
            const filename = `${image.originalname}`;
            callback(null, filename);
          },
        }),
      }),
    )
    async AddvistitedImages(
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
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
       }
    
      for(const file of files){
        const newalbum = new VisitedPalce();
        newalbum.path =file.path
        newalbum.destination =file.destination
        newalbum.filename =file.filename
        newalbum.fieldname =file.fieldname;
        newalbum.PlaceName = req.body.PlaceName;
        await this.AlbumimageRepo.save({...newalbum, tourpackage})
      }
      return res.status(HttpStatus.OK).send({message: "visited Image Added Successfully",Tourpackage })
      }
     

    @Post(':id/AddPackageIncluded')
    addpackageIncluded(
      @Param('id', ParseIntPipe) id: number,
      @Body()
      createpackageIncludeDto: createPackageIncludeDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      const packageincluded = this.tourpackagesService.AddpackageIncluded(
        id,
        createpackageIncludeDto,
      );
      return res.status(HttpStatus.OK).send({
        packageincluded,
        message: 'travel package Inlcluded Iteam Added',
      });
    }


    @Post(':id/AddTourPackagePlan')
    addTourPackagePlan(
      @Param('id', ParseIntPipe) id: number,
      @Body() tourpackagePlandto: CreateTourPackagePlanDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      const tourpackageplan = this.tourpackagesService.AddTourpackagePlan(
        id,
        tourpackagePlandto,
      );
      return res.status(HttpStatus.OK).json({
        tourpackageplan,
        message: 'travel package plan added Iteam Added',
      });
    }




 /// addd package excluions
  @Post(':id/AddTourPackageExclusions')
  async addTourPackageExclusions(
    @Param('id', ParseIntPipe) id: number,
    @Body() packageexcluionsdto: CreatepackageExclsuionsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const exclsuions = await this.tourpackagesService.AddpackageExclsuions(
      id,
      packageexcluionsdto,
    );
    return res.status(HttpStatus.OK).send({ message: "exlusions  Added Successfully", exclsuions })
  }

// get package exclsuions

  @Get(':id/Exclsuions/:ExId')
  async getPackageExclsuions(
   @Param('id') id: number,
   @Param('ExId') ExId: number,
   @Req() req: Request,
   @Res() res: Response)
   {
    const exclsuions = await this.tourpackagesService.FindExclsuions(id,ExId)
    return res.status(HttpStatus.OK).json({
     message: `Exclsuions with this Id=${ExId} is`,
     exclsuions,
   });
   }

//update package exclsuions



@Patch(':id/updateExclsuions/:ExId')
async updateExlsuions(
  @Param('id') id: number,
  @Param('ExId') ExId: number,
  @Body() updateExclusionsDto: updatepackageExclusionsDto,
  req: Request,
  @Res() res: Response,
) {
  const updateexlsuions = await this.tourpackagesService.updateExclusions(id,ExId,updateExclusionsDto)
  return res.status(HttpStatus.OK).json({
    message: `Exclsuions with Id=${ExId} has updated successfully`,
    updateexlsuions,
  });
}


// delete excluions
@Delete(':id/deleteExclusions/:ExId')
 async DeleteIncluions(
  @Param('id') id: number,
  @Param('ExId') ExId: number,
  @Req() req: Request,
  @Res() res: Response)
  {
   await this.tourpackagesService.DeleteIExclusion(id,ExId)
   return res.status(HttpStatus.OK).json({
    message:`Exclusion Id=${ExId} has deleted successfully`,
  });
}







    @Post(':id/AddTourPackageHighlight')
    addTourPackageHighlight(
      @Param('id', ParseIntPipe) id: number,
      @Body() packageHighlightdto: CreatePackageHighlightDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      const tourpackagehighlight = this.tourpackagesService.AddPackageHighlight(
        id,
        packageHighlightdto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'travel package Highlight added', tourpackagehighlight
      });
    }


    @Post(':id/AddBookingPolicy')
    addTourPackageBookingPolicy(
      @Param('id', ParseIntPipe) id: number,
      @Body() bookingpolicydto: CreateBookingPolicyDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      const tourpackageplan = this.tourpackagesService.createbookingPolicy(
        id,
        bookingpolicydto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'travel package booking policy added',tourpackageplan
      });
      
    }


    @Post(':id/AddrefundPolicy')
  async  addrefundPolicy(
      @Param('id', ParseIntPipe) id: number,
      @Body() refundpolicydto: createRefundPolicyDto,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      await this.tourpackagesService.AddRefundPolicy(
        id,
        refundpolicydto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'travel package refundpolicy policy added',
      });
    }
  }
