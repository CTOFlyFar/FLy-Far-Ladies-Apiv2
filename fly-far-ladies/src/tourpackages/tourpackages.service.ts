import { image } from './../image/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { tourpackage } from './entities/tourpackage.entity';
import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { packageincluded } from './entities/PackageInclude.entity';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { packageinclusion } from './entities/packageInclusion.entitry';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';

@Injectable()
export class TourpackagesService {
  constructor(
  @InjectRepository(tourpackage) private travelPackageRepo:Repository<tourpackage>,
  @InjectRepository(image) private Imagerepo:Repository<image>,
  @InjectRepository(packageincluded) private packageIncludeRepo:Repository<packageincluded>,
  @InjectRepository(packageinclusion) private packageInclusionRepo:Repository<packageinclusion>,
  
  ){}

  async create(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage =await this.travelPackageRepo.create(createTourpackageDto)
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage)
    return Addtravelpackage;
  }

  async findAll() {
    return this.travelPackageRepo.find({
      relations: {
        packageincluded:true,
        cartimage:true,
        PackageInclusions:true,
      }
  })
}

  async findOne(Id: number) {
    return await this.travelPackageRepo.findOneBy({Id});
  }

  async update(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return await this.travelPackageRepo.update({Id}, {...updateTourpackageDto})
  }

  async remove(Id: number) {
    return await this.travelPackageRepo.delete(Id);
  }

  async AddpackageIncluded(Id:number,PackgeincludedDto:createPackageIncludeDto){
    const Tourpackage = await this.travelPackageRepo.findOneBy({Id});
    if(!Tourpackage){
      throw new HttpException("TourPackage not found, cann't add cover image", HttpStatus.BAD_REQUEST)
    }
    const newtourpackage = await this.packageIncludeRepo.create(PackgeincludedDto);
    const savepackageincluded = await this.packageIncludeRepo.save(newtourpackage);
    Tourpackage.packageincluded =savepackageincluded ;
    return  await this.travelPackageRepo.save(Tourpackage)  
  }

  async AddpackageInclusions(Id:number,PackgeinclusionsDto:createpackageincluionDto){
    const Tourpackage = await this.travelPackageRepo.findOneBy({Id});
    if(!Tourpackage){
      throw new HttpException("TourPackage not found, cann't add cover image", HttpStatus.BAD_REQUEST)
    }
    const newtourpackage = await this.packageInclusionRepo.create(PackgeinclusionsDto);
    const savepackageinclusion = await this.packageInclusionRepo.save(newtourpackage);
    Tourpackage.PackageInclusions =savepackageinclusion ;
    return  await this.travelPackageRepo.save(Tourpackage)  
  }
}
