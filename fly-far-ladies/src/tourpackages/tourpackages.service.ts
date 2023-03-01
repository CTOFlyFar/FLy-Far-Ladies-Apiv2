
import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { Tourpackage } from 'src/tourpackages/entities/tourpackage.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { packageincluded } from './entities/PackageInclude.entity';

import { packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';

import { packageexcluions } from './entities/packageexclsuions.entity';

import { packagehighlight } from './entities/packagehighlight.entity';

import { refundpolicy } from './entities/refundpolicy.entity';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { CartImage } from './entities/cartimage.entity';

@Injectable()
export class TourpackagesService {
  constructor(
    @InjectRepository(Tourpackage)
    private travelPackageRepo: Repository<Tourpackage>,
    @InjectRepository(packageincluded)
    private packageIncludeRepo: Repository<packageincluded>,
    @InjectRepository(packageinclusion)
    private packageInclusionRepo: Repository<packageinclusion>,
    @InjectRepository(tourpackageplan)
    private tourpackagePanRepo: Repository<tourpackageplan>,
    @InjectRepository(packageexcluions)
    private packageexcluionsRepo: Repository<packageexcluions>,
    @InjectRepository(packagehighlight)
    private packageHighlightRepo: Repository<packagehighlight>,
    @InjectRepository(bookingpolicy)
    private bookingPolicyRepo: Repository<bookingpolicy>,
    @InjectRepository(refundpolicy)
    private refundPolicyRepo: Repository<refundpolicy>,
    @InjectRepository(CartImage)
    private CartImageRepo: Repository<CartImage>,
  ) {}

  async Addtravelcreate(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage = await this.travelPackageRepo.create(
      createTourpackageDto,
    );
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage);
    return Addtravelpackage;
  }

  async findAllTravelpackage() {
    return await this.travelPackageRepo.find({
  //     relations: {
  //     cartimage: true,
  //     albumImages: true,
  //     vistitedImages:true,
  //     exclusions: true,
  //     includes:true,
  //     BookingPolicys:true,
  //     PackageInclusions: true,
  //     highlights:true,
  //     refundpolicys:true,
  //     tourpackageplans:true

  // }

 }) 
  }

  async findOnePackage(Id:number){
    const tarvelpackage = await this.travelPackageRepo.find({
      where: { Id},
      // relations: {
      //   cartimage: true,
      //   albumImages: true,
      //   vistitedImages:true,
      //   exclusions: true,
      //   includes:true,
      //   BookingPolicys:true,
      //   PackageInclusions: true,
      //   highlights:true,
      //   refundpolicys:true,
      //   tourpackageplans:true
      // },
    })
    return tarvelpackage;
    // );

  }
  async updatePackage(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return await this.travelPackageRepo.update(
      { Id },
      { ...updateTourpackageDto },
    );
  }


//  async findcartimage(Id:number){
//   const cardImage= await this.CartImageRepo.findOne({
//     where:{Id}})
//     if (!cardImage) {
//       throw new HttpException(
//         `cardImage not found with this id=${Id}`,
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   return CartImage
//  }

  async removepackage(Id: number) {
    const deletepackage = await this.travelPackageRepo.delete(Id);
    if (!deletepackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  async createbookingPolicy(Id:number, CreateBookingPolicyDto:CreateBookingPolicyDto):Promise<bookingpolicy>{
    const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const creatpolicy = await this.bookingPolicyRepo.create({...CreateBookingPolicyDto, tourpackage});
    const createdpolicy= await this.bookingPolicyRepo.save(creatpolicy)
    return createdpolicy;

  }
 

    async AddpackageIncluded(
      Id: number,
      PackgeincludedDto: createPackageIncludeDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
      }
      const Addincluded = await this.packageIncludeRepo.create({...PackgeincludedDto,tourpackage});
      const saveincluded = await this.packageIncludeRepo.save(Addincluded);
      return saveincluded;
      

    }

    async AddpackageInclusions(
      Id: number,
      PackgeinclusionsDto: createpackageincluionDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
      }
      const newInclusions = this.packageInclusionRepo.create({...PackgeinclusionsDto, tourpackage});
       await this.packageInclusionRepo.save(
        newInclusions
      );
      
    }

    async AddTourpackagePlan(
      Id: number,
      tourpackageplandto: CreateTourPackagePlanDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add tourplan",
          HttpStatus.BAD_REQUEST,
        );
      }
      const createpackageplan =
        this.tourpackagePanRepo.create({...tourpackageplandto,tourpackage});
      const savenewpackageplan = await this.tourpackagePanRepo.save(
        createpackageplan,
      );
      return savenewpackageplan;
  
    }


  async AddpackageExclsuions(
    Id: number,
    exclusiondto: CreatepackageExclsuionsDto,
  ) {

    const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
      }
      const exclusion= await this.packageexcluionsRepo.create({...exclusiondto, tourpackage});
      await this.packageexcluionsRepo.save(exclusion);

    }


    async AddPackageHighlight(
      Id: number,
      packagehighlightdto: CreatePackageHighlightDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
      }
      const createHightlight =
        this.packageHighlightRepo.create({...packagehighlightdto,tourpackage});
      const saveHighlight = await this.packageHighlightRepo.save(
        createHightlight,
      );
      return saveHighlight;

    }

    
    async AddRefundPolicy(
      Id: number,
      refundpolicydto: createRefundPolicyDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
      }
      const createrefundpolicy = this.refundPolicyRepo.create({...refundpolicydto,tourpackage});
      const newrefundpolicy = await this.refundPolicyRepo.save(
        createrefundpolicy,
      );
      return newrefundpolicy;
      
    }

    async AddcartImage(
      Id: number,
      createcartimagedto: CreateImageDto,
    ) {
      const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
      if (!tourpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add cover image",
          HttpStatus.BAD_REQUEST,
        );
      }
      const createrefundpolicy = this.refundPolicyRepo.create(createcartimagedto);
      const newrefundpolicy = await this.refundPolicyRepo.save(
        createrefundpolicy,
      );
      return newrefundpolicy;
      
    }
  

  }