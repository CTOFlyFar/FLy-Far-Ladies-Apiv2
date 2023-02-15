import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tour_package.dto';
import { UpdateTourPackageDto } from './dto/update-tour_package.dto';
import { TourPackage } from './entities/tour_package.entity';

@Injectable()
export class TourPackagesService {
  constructor(@InjectRepository(TourPackage) private TourPackageRep:Repository<TourPackage>){}
  async create(createTourPackageDto: CreateTourPackageDto) {
    const addPackage = await this.TourPackageRep.create(createTourPackageDto)
    const tourpackage= await this.TourPackageRep.save(addPackage)
    return tourpackage;
    
  }

  async findAll():Promise<TourPackage[]> {
    return await this.TourPackageRep.find();
  }

   findOne(Id:number):Promise<TourPackage> {
    return this.TourPackageRep.findOneBy({Id}) ;
  }
  async findOneByPkId(PkId:string):Promise<TourPackage> {
    
    // return await this.TourPackageRep
    // .createQueryBuilder("users")
    // .select("users.PkId", "PkId")
    // .getOne()
    return await this.TourPackageRep.findOne({where:{
      PkId,
    }}) ;
  
}

  async update(Id: number, updateTourPackageDto: UpdateTourPackageDto) {

    //for all data update
    const updatepackage= await this.TourPackageRep.update({Id}, {...updateTourPackageDto})
    return updatepackage;
    // const updatepackage = await this.TourPackageRep.findOne({where:{Id}})
    // updatepackage.Title = updateTourPackageDto.Title;
    // updatepackage.CoverImage = updateTourPackageDto.CoverImage;
    // updatepackage.Duration  =updateTourPackageDto.Duration;
    // updatepackage.Location = updateTourPackageDto.Location;
    // updatepackage.StartDate = updateTourPackageDto.StartDate;
    // updatepackage.EndDate =updateTourPackageDto.EndDate;
    // updatepackage.Highlights =updateTourPackageDto.Highlights;
    // updatepackage.Price = updateTourPackageDto.Price
    // const updatedPackage= await this.TourPackageRep.save(updatepackage);
    // return updatedPackage;
  }

 async remove(Id:string){
    const DeletePackage= await this.TourPackageRep.delete(Id);
    return DeletePackage;

  }
}
