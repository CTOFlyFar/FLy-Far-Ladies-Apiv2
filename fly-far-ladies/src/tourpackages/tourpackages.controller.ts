

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
  UploadedFile,
  UploadedFiles,
  Patch,

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
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { VisitedPalce } from './entities/visitedplace.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';


@Controller('tourpackages/:policyId/bookingpolicy')
export class BookingPolicycontroller {
  constructor( @InjectRepository(bookingpolicy) private bookingrepRepo: Repository<bookingpolicy>,
){}


  @Get(':bkId')
  async getChildById(
    @Param('policyId') policyId: number,
    @Param('bkId') bkId: number): Promise<bookingpolicy> {
    const childRepository = await this.bookingrepRepo.createQueryBuilder('bookingpolicy');
    const bookingpolicy = await childRepository
      .innerJoin('bookingpolicy.tourpackage', 'tourpackages')
      .where('tourpackages.Id = :policyId', { policyId })
      .andWhere('bookingpolicy.Id = :bkId', { bkId })
      .getOne();
    return bookingpolicy;
  }

// @Patch()
// async updatebookingPolicy(@Param('policyId') policyId: number,
// @Param('bkId') bkId: number): Promise<bookingpolicy>{

}
  


@Controller('tourpackages')
export class TourpackagesController {
  constructor(
    //repository
    @InjectRepository(AlbumImage) private VisitedmageRepo: Repository<AlbumImage>,
    @InjectRepository(VisitedPalce) private AlbumimageRepo: Repository<AlbumImage>,
    @InjectRepository(CartImage) private cartmageRepo: Repository<CartImage>,
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
    const TourPackage = await this.tourpackagesService.Addtravelcreate(
      createTourpackageDto,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Travel Package added successfully', TourPackage });
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



  // @Get('cardimage/:id')
  // findOneCard(@Param('id') id: number) {
  //   const cardimage = this.tourpackagesService.findcartimage(id);
  //   if (!cardimage) {
  //     throw new HttpException(
  //       `card Image not found with this = ${id}`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return cardimage;
  // }






   //End travel package 
  @Post(':Id/AddcartImage')
  @UseInterceptors(
    FileInterceptor('image',{
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

    const newimage = new CartImage();
    newimage.path = file.path;
    newimage.ImageTitle= req.body.ImageTitle
    const updatedpackge = await this.cartmageRepo.save(newimage);
    tourpackage.cartimage =updatedpackge
    await this.travelPackageRepo.save(tourpackage);
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
      return res.status(HttpStatus.OK).send({message: "visited Added Successfully",Tourpackage })
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

    return res.status(HttpStatus.OK).send({ message: "exlsuions  Added Successfully", exclsuions })
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
