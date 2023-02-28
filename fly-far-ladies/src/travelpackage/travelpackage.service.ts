
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTravelpackageDto } from './dto/create-travelpackage.dto';
import { UpdateTravelpackageDto } from './dto/update-travelpackage.dto';
import { Travelpackage } from './entities/travelpackage.entity';


@Injectable()
export class TravelpackageService {
  constructor(@InjectRepository(Travelpackage) private TravelPackageRepo:Repository<Travelpackage>){}
 async create(createTravelpackageDto: CreateTravelpackageDto) {
      const travelpackage = await this.TravelPackageRepo.create(
        createTravelpackageDto,
    );
    const Addtravelpackage = await this.TravelPackageRepo.save(travelpackage);
    return Addtravelpackage;
  }

 async findAll() {
  const Travelpackage= await this.TravelPackageRepo.find();
  return Travelpackage;
  }

 async findOne(Id:number) {
    const travelpackage= await this.TravelPackageRepo.findOne({where:{Id}});
    return travelpackage;
  }

async update(Id: number, updateTravelpackageDto: UpdateTravelpackageDto) {
  const updatetravelpackgae= await this.TravelPackageRepo.update({Id}, {...updateTravelpackageDto});
  return updatetravelpackgae;
  }

async remove(Id: number) {
  const deletepackage=  await this.TravelPackageRepo.delete(Id);
  return deletepackage;
  }
}
