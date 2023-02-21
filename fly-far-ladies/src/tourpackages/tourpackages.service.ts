import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { TourPackage } from './entities/tourpackage.entity';

@Injectable()
export class TourpackagesService {
  constructor(@InjectRepository(TourPackage) private travelPackageRepo:Repository<TourPackage>){}
  async create(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage =await this.travelPackageRepo.create(createTourpackageDto)
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage)
    return Addtravelpackage;
  }

  async findAll() {
    return this.travelPackageRepo.find({});
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
}
