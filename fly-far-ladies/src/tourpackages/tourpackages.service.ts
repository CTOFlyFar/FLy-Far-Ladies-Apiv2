import { tourpackage } from 'src/tourpackages/entities/tourpackage.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
// import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { packageincluded } from './entities/PackageInclude.entity';
// import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
// import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
// import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { packageexcluions } from './entities/packageexclsuions.entity';
// import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { packagehighlight } from './entities/packagehighlight.entity';
// import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
// import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { refundpolicy } from './entities/refundpolicy.entity';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';

@Injectable()
export class TourpackagesService {
  constructor(
    @InjectRepository(tourpackage)
    private travelPackageRepo: Repository<tourpackage>,
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
  ) { }

  async create(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage = await this.travelPackageRepo.create(
      createTourpackageDto,
    );
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage);
    return Addtravelpackage;
  }

  async findAll() {
    return this.travelPackageRepo.find({
      relations: {
       
        cartimages: true,
        albumImages:true,
        exclusions:true,
        // PackageInclusions: true,
        // tourpackageplans: true,
       
        // PackageHighlights: true,
        // BookingPolicys: true,
      },
    });
  }

  async findOne(Id: number) {
    const tarvelpackage = await this.travelPackageRepo.find({
      where: { Id },
      relations: {
        // packageincluded: true,
        cartimages: true,
        albumImages:true,
        exclusions:true
        // PackageInclusions: true,
        // tourpackageplans: true,
        // packageExcluions: true,
        // PackageHighlights: true,
        // BookingPolicys: true,
      },
    }
    );
    if (!tarvelpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return tarvelpackage;
  }

  async update(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return await this.travelPackageRepo.update(
      { Id },
      { ...updateTourpackageDto },
    );
  }

  async remove(Id: number) {
    const deletepackage = await this.travelPackageRepo.delete(Id);
    if (!deletepackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }


//   async AddpackageIncluded(
//     Id: number,
//     PackgeincludedDto: createPackageIncludeDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const Addincluded = await this.packageIncludeRepo.create(PackgeincludedDto);
//     const savepackageincluded = await this.packageIncludeRepo.save(Addincluded);
//     // Tourpackage.packageincluded = savepackageincluded;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }

//   async AddpackageInclusions(
//     Id: number,
//     PackgeinclusionsDto: createpackageincluionDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const newInclusions = this.packageInclusionRepo.create(PackgeinclusionsDto);
//     const savepackageinclusion = await this.packageInclusionRepo.save(
//       newInclusions,
//     );
//     Tourpackage.PackageInclusions = savepackageinclusion;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }

//   async AddTourpackagePlan(
//     Id: number,
//     tourpackageplandto: CreateTourPackagePlanDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const createpackageplan =
//       this.tourpackagePanRepo.create(tourpackageplandto);
//     const savenewpackageplan = await this.tourpackagePanRepo.save(
//       createpackageplan,
//     );
//     Tourpackage.tourpackageplans = savenewpackageplan;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }

  async AddpackageExclsuions(
    Id: number,
    packageexclusionsdto: CreatepackageExclsuionsDto,
  ){
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createexlsuions =
      this.packageexcluionsRepo.create(packageexclusionsdto);
   const updateexclu= await this.packageexcluionsRepo.save(
    createexlsuions,
    );
    Tourpackage.exclusions= updateexclu
    return await this.travelPackageRepo.save(Tourpackage);
  }

//   async AddPackageHighlight(
//     Id: number,
//     packagehighlightdto: CreatePackageHighlightDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const createpackageHightlight =
//       this.packageHighlightRepo.create(packagehighlightdto);
//     const savenewpackageHighlight = await this.packageHighlightRepo.save(
//       createpackageHightlight,
//     );
//     Tourpackage.PackageHighlights = savenewpackageHighlight;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }

//   async AddPackageBookingPolicy(
//     Id: number,
//     bookingpolicydto: CreateBookingPolicyDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const createbookingpolicy = this.bookingPolicyRepo.create(bookingpolicydto);
//     const newbookingpolicy = await this.bookingPolicyRepo.save(
//       createbookingpolicy,
//     );
//     Tourpackage.BookingPolicys = newbookingpolicy;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }

//   async AddRefundPolicy(
//     Id: number,
//     refundpolicydto: createRefundPolicyDto,
//   ) {
//     const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
//     if (!Tourpackage) {
//       throw new HttpException(
//         "TourPackage not found, cann't add cover image",
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//     const createrefundpolicy = this.refundPolicyRepo.create(refundpolicydto);
//     const newrefundpolicy = await this.refundPolicyRepo.save(
//       createrefundpolicy,
//     );
//     Tourpackage.refundpolicys = newrefundpolicy;
//     return await this.travelPackageRepo.save(Tourpackage);
//   }
// 

}
