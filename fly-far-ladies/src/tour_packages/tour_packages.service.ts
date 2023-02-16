import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';
import { Repository } from 'typeorm';
import { CreateCoverImageDto } from './dto/cover-image.dto';
import { CreateTourPackageDto } from './dto/create-tour_package.dto';
import { UpdateTourPackageDto } from './dto/update-tour_package.dto';
import { CoverImage } from './entities/image.entity';
import { TourPackage } from './entities/tour_package.entity';



@Injectable()
export class TourPackagesService {
  constructor(
    @InjectRepository(TourPackage) private TourPackageRep:Repository<TourPackage>,
    @InjectRepository(CoverImage) private CoverImageRepo:Repository<CoverImage>) {}

   // add tour package 
  async create(createTourPackageDto: CreateTourPackageDto) {
    const addPackage = await this.TourPackageRep.create(createTourPackageDto)
    const tourpackage= await this.TourPackageRep.save(addPackage)
    return tourpackage;
    
  }
  // find all tour pac kage
  async findAll():Promise<TourPackage[]> {
    return await this.TourPackageRep.find({relations:['CoverImage']});
  }
  // find a single tour package
   findOne(Id:number):Promise<TourPackage> {
    const tourpackage = this.TourPackageRep.findOneBy({Id})
    if(!tourpackage){
      throw new HttpException(`TourPackage not found with this = ${Id}`, HttpStatus.BAD_REQUEST)
    }
    return tourpackage;
  }

  //find tour package by PkId
  async findOneByPkId(PkId:string):Promise<TourPackage> {
    
    // return await this.TourPackageRep
    // .createQueryBuilder("users")
    // .select("users.PkId", "PkId")
    // .getOne()
    return await this.TourPackageRep.findOne({where:{
      PkId,
    }}) ;
  
}
  // update tour package
  async update(Id:number, updateTourPackageDto: UpdateTourPackageDto) {

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
    if(!DeletePackage){
      throw new HttpException(`TourPackage not found with this = ${Id}`, HttpStatus.BAD_REQUEST)
    }
    return DeletePackage;

  }

  async createCoverImage(Id:number,CreateCoverImageDto:CreateCoverImageDto){
    const Tourpackage = await this.TourPackageRep.findOneBy({Id});
    if(!Tourpackage){
      throw new HttpException("TourPackage not found, cann't add cover image", HttpStatus.BAD_REQUEST)
    }
    const newtourpackage= await this.CoverImageRepo.create(CreateCoverImageDto)
   
    const savecoverimage= await this.CoverImageRepo.save(newtourpackage)
    Tourpackage.CoverImage =savecoverimage

    return  await this.TourPackageRep.save(Tourpackage)  
  }


   
}


//file validation
@Injectable()
 export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }
}

