import { image } from './../image/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { tourpackage } from './entities/tourpackage.entity';
import {Injectable } from '@nestjs/common';

@Injectable()
export class TourpackagesService {
  constructor(@InjectRepository(tourpackage) private travelPackageRepo:Repository<tourpackage>,
  @InjectRepository(image) private Imagerepo:Repository<image>){}

  async create(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage =await this.travelPackageRepo.create(createTourpackageDto)
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage)
    return Addtravelpackage;
  }

  async findAll() {
    return this.travelPackageRepo.find({
      relations:["image"],
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

  // async AddImage(Id:number,CreateImageDto:CreateImageDto){
  //   const Tourpackage = await this.travelPackageRepo.findOneBy({Id});
  //   if(!Tourpackage){
  //     throw new HttpException("TourPackage not found, cann't add cover image", HttpStatus.BAD_REQUEST)
  //   }
  //   const newtourpackage = await this.Imagerepo.create(CreateImageDto);
  //   const savecoverimage = await this.Imagerepo.save(newtourpackage);
  //   Tourpackage.Image = newtourpackage
  //   return  await this.travelPackageRepo.save(savecoverimage)  
  // }
}
