import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { TourPackage } from './entities/tourpackage.entity';

@Injectable()
export class TourpackagesService {
  constructor(@InjectRepository(TourPackage) private travelPackageRepo:Repository<TourPackage>){}
  create(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage = this.travelPackageRepo.create(createTourpackageDto)
    const Addtravelpackage = this.travelPackageRepo.save(travelpackage)
    return Addtravelpackage;
  }

  findAll() {
    return this.travelPackageRepo.find({});
  }

  findOne(Id: number) {
    return  this.travelPackageRepo.findOneBy({Id});
  }

  update(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return this.travelPackageRepo.update({Id}, {...updateTourpackageDto})
  }

  remove(Id: number) {
    return this.travelPackageRepo.delete(Id);
  }
}
