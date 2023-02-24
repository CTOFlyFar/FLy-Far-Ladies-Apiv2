import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { tourpackage } from 'src/tourpackages/entities/tourpackage.entity';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  UploadedFiles,
  ParseFilePipeBuilder,
  UseInterceptors,
} from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { Request, Response } from 'express';
import { image } from 'src/image/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { diskStorage } from 'multer';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(
    @InjectRepository(image) private imageRepo: Repository<image>,
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
      .json({ message: 'Travel Package added successfully', TourPackage });
  }

  @Get('AllPackages')
  async findAll() {
    return await this.tourpackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const tourpackage = this.tourpackagesService.findOne(+id);
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
    const updatepackage = await this.tourpackagesService.update(
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
    const deletePackage = await this.tourpackagesService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: `Tour Package Id=${id} has deleted successfully`,
    });
  }

  @Post(':Id/AddcartImage')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './Images',
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
    @Res() res: Response,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const file of files) {
      // const newimage= await this.imageRepo.create});
      const newimage = new image();
      newimage.filename = file.filename;
      newimage.destination = file.destination;
      newimage.fieldname = file.fieldname;
      newimage.path = file.path;
      newimage.originalname = file.originalname;
      const updatedpackge = await this.imageRepo.save(newimage);
      Tourpackage.cartimage = updatedpackge;
      await this.travelPackageRepo.save(Tourpackage);
      return res
        .status(HttpStatus.OK)
        .send({ updatedpackge, message: 'Travel Package cart Image added' });
    }
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
  addTourPackageExclusions(
    @Param('id', ParseIntPipe) id: number,
    @Body() packageexcluionsdto: CreatepackageExclsuionsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackageplan = this.tourpackagesService.AddpackageExclsuions(
      id,
      packageexcluionsdto,
    );
    return res.status(HttpStatus.OK).json({
      tourpackageplan,
      message: 'travel package plan added Iteam Added',
    });
  }


  @Post(':id/AddTourPackageHighlight')
  addTourPackageHighlight(
    @Param('id', ParseIntPipe) id: number,
    @Body() packageHighlightdto: CreatePackageHighlightDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const tourpackageplan = this.tourpackagesService.AddPackageHighlight(
      id,
      packageHighlightdto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'travel package Highlight added',
    });
  }
}
