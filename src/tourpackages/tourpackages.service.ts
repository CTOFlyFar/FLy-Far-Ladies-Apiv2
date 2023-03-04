
import { Tourpackage } from 'src/tourpackages/entities/tourpackage.entity';
import { bookingpolicy } from './entities/bookingpolicy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { packageincluded } from './entities/PackageInclude.entity';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { packageexcluions } from './entities/packageexclsuions.entity';
import { CreatepackageExclsuionsDto } from './dto/create-packageexclusions.dto';
import { packagehighlight } from './entities/packagehighlight.entity';
import { refundpolicy } from './entities/refundpolicy.entity';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { CreateBookingPolicyDto } from './dto/creat-bookingpolicy.dto';
import { CreatePackageHighlightDto } from './dto/create-packagehighlights.dto';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createRefundPolicyDto } from './dto/create-refundpolicy.dto';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { Packageinclusion } from './entities/packageInclusion.entitry';
import { updateBookingPolicyDto } from './dto/update-bookingpolicy.dto';
import { UpdateRefundPolicy } from './dto/update-refundpolicy.dto';
import { updatepackageInclusionDto } from './dto/update-packageincluion.dto';
import { CardImage } from './entities/cardImage.entity';
import { updatepackageExclusionsDto } from './dto/update-packageexclsuions.dto';
import { updateTourPackagePlanDto } from './dto/update-tourpackageplan.dto';
import { UpdatepackageHighlightDto } from './dto/update-packagehighlightdto';


@Injectable()
export class TourpackagesService {
  constructor(
    @InjectRepository(Tourpackage)
    private travelPackageRepo: Repository<Tourpackage>,
    @InjectRepository(packageincluded)
    private packageIncludeRepo: Repository<packageincluded>,
    @InjectRepository(Packageinclusion)
    private packageInclusionRepo: Repository<Packageinclusion>,
    @InjectRepository(tourpackageplan)
    private tourpackagePlanRepo: Repository<tourpackageplan>,
    @InjectRepository(packageexcluions)
    private packageexcluionsRepo: Repository<packageexcluions>,
    @InjectRepository(packagehighlight)
    private packageHighlightRepo: Repository<packagehighlight>,
    @InjectRepository(bookingpolicy)
    private bookingPolicyRepo: Repository<bookingpolicy>,
    @InjectRepository(refundpolicy)
    private refundPolicyRepo: Repository<refundpolicy>,
    @InjectRepository(CardImage)
    private CardImageRepo: Repository<CardImage>
  ) { }



  // travel package start



  //Add travel package
  async CreatTravelPackage(createTourpackageDto: CreateTourPackageDto) {
    const travelpackage = await this.travelPackageRepo.create(
      createTourpackageDto,
    );
    const Addtravelpackage = await this.travelPackageRepo.save(travelpackage);
    return Addtravelpackage;
  }


  // get all travel package
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

  // get single package
  async findOnePackage(Id: number) {
    const tarvelpackage = await this.travelPackageRepo.find({
      where: { Id },
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

  }


  //update package
  async updatePackage(Id: number, updateTourpackageDto: UpdateTourpackageDto) {
    return await this.travelPackageRepo.update(
      { Id },
      { ...updateTourpackageDto },
    );
  }
  //delete package
  async removepackage(Id: number) {
    const deletepackage = await this.travelPackageRepo.delete(Id);
    if (!deletepackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // End travel package


  // card image start



  // det card image
  async FindCardImage(Id: number, CardId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const cardimage = await this.CardImageRepo.findOne({ where: { CardId } })
    if (!cardimage) {
      throw new HttpException(
        `Image not found with this filename=${CardId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return cardimage;
  }

  // get all card image
  async FindAllCardImage(Id: number,) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const cardimage = await this.CardImageRepo.find({})
    if (!cardimage) {
      throw new HttpException(
        `Image not found with `,
        HttpStatus.BAD_REQUEST,
      );
    }
    return cardimage;
  }


  //card image end


  // booking policy start.........................


  //add booking policy
  async createbookingPolicy(Id: number, CreateBookingPolicyDto: CreateBookingPolicyDto): Promise<bookingpolicy> {
    const tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const creatpolicy = await this.bookingPolicyRepo.create({ ...CreateBookingPolicyDto, tourpackage });
    const createdpolicy = await this.bookingPolicyRepo.save(creatpolicy)
    return createdpolicy;

  }




  // find booking policy
  async FindbookingPolicy(Id: number, BkId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return bookingpolicy;
  }

  //update booking policy
  async updateBookingolicy(Id: number, BkId: number, updateBOokingPolicy: updateBookingPolicyDto) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatepolicy = await this.bookingPolicyRepo.update({ BkId }, { ...updateBOokingPolicy })
    return updatepolicy;
  }



  //Delete booking policy
  async DeletebookingPolicy(Id: number, BkId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.bookingPolicyRepo.findOne({ where: { BkId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${BkId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.bookingPolicyRepo.delete(BkId);
  }

  //End Booking Policy..........................




  // start refund policy
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
    const createrefundpolicy = this.refundPolicyRepo.create({ ...refundpolicydto, tourpackage });
    const newrefundpolicy = await this.refundPolicyRepo.save(
      createrefundpolicy,
    );
    return newrefundpolicy;

  }


  // get refund policy
  async FindRefundPolicy(Id: number, RId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!refundpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return refundpolicy;
  }


  // update Refund policy
  async updateRefundolicy(Id: number, RId: number, updaterefundPolicy: UpdateRefundPolicy) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const bookingpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!bookingpolicy) {
      throw new HttpException(
        `booking policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatepolicy = await this.refundPolicyRepo.update({ RId }, { ...updaterefundPolicy })
    return updatepolicy;
  }


  //Delete refund policy
  async DeleterefundPolicy(Id: number, RId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const Refundpolicy = await this.refundPolicyRepo.findOne({ where: { RId } })
    if (!Refundpolicy) {
      throw new HttpException(
        `Refund policy not found with this id=${RId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.refundPolicyRepo.delete(RId);
  }


  ///End refund Policy


  /// start packgae inclsions.....................


  //  Add package inclusions

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
    const newInclusions = await this.packageInclusionRepo.create({ ...PackgeinclusionsDto, tourpackage });
    const updatetour = await this.packageInclusionRepo.save(newInclusions)
    return updatetour;
  }

  // find inclusions
  async FindInclsuions(Id: number, InId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclusions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return inclusions;
  }



  // update inclusions
  async updateInclusions(Id: number, InId: number, updateInclusionsDto: updatepackageInclusionDto) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclsuions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclsuions) {
      throw new HttpException(
        `inclusions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateinclsuions = await this.packageInclusionRepo.update({ InId }, { ...updateInclusionsDto })
    return updateinclsuions;
  }


  // Delete Inclusions
  async DeleteInclusion(Id: number, InId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.packageInclusionRepo.findOne({ where: { InId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclsuions not found with this id=${InId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageInclusionRepo.delete(InId);
  }

  /// end inclusions....................


  /// start package exclsuions

  //add exclsuions

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
    const exclusion = await this.packageexcluionsRepo.create({ ...exclusiondto, tourpackage });
    await this.packageexcluionsRepo.save(exclusion);

  }

  // find Exclusions
  async FindExclsuions(Id: number, ExId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const Exclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!Exclusions) {
      throw new HttpException(
        `Exclusions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return Exclusions;
  }

  // update inclusions
  async updateExclusions(Id: number, ExId: number, updateExlusionsDto: updatepackageExclusionsDto) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const exclsuions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!exclsuions) {
      throw new HttpException(
        `inclusions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateExclsuions = await this.packageexcluionsRepo.update({ ExId }, { ...updateExlusionsDto })
    return updateExclsuions;
  }


  // Delete exclusions
  async DeleteIExclusion(Id: number, ExId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.packageexcluionsRepo.findOne({ where: { ExId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclsuions not found with this id=${ExId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageexcluionsRepo.delete(ExId);
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
    const Addincluded = await this.packageIncludeRepo.create({ ...PackgeincludedDto, tourpackage });
    const saveincluded = await this.packageIncludeRepo.save(Addincluded);
    return saveincluded;
  }



  // add tour package

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
      this.tourpackagePlanRepo.create({ ...tourpackageplandto, tourpackage });
    const savenewpackageplan = await this.tourpackagePlanRepo.save(
      createpackageplan,
    );
    return savenewpackageplan;

  }





  // find Exclusions
  async Finddayplan(Id: number, dayId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!dayplan) {
      throw new HttpException(
        `tour plan not found not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return dayplan;
  }

  // update inclusions
  async updatedayplan(Id: number, dayId: number, updatedayplanDto: updateTourPackagePlanDto) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const dayplan = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!dayplan) {
      throw new HttpException(
        `day plan not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const uodatedayplan = await this.tourpackagePlanRepo.update({ dayId }, { ...updatedayplanDto })
    return uodatedayplan;
  }


  // Delete exclusions
  async DeleteIdayplan(Id: number, dayId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const inclusions = await this.tourpackagePlanRepo.findOne({ where: { dayId } })
    if (!inclusions) {
      throw new HttpException(
        `Inclsuions not found with this id=${dayId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tourpackagePlanRepo.delete(dayId);
  }


  // startr highlights


  // Add package highlight




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
      this.packageHighlightRepo.create({ ...packagehighlightdto, tourpackage });
    const saveHighlight = await this.packageHighlightRepo.save(
      createHightlight,
    );
    return saveHighlight;

  }


  // find highlight
  async FindHighlight(Id: number, HiId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const dayplan = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!dayplan) {
      throw new HttpException(
        `Package highlight not found with this id ${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return dayplan;
  }

  // update inclusions
  async updateHighlight(Id: number, HiId: number, updateHighlightDto: UpdatepackageHighlightDto) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!highlight) {
      throw new HttpException(
        `day plan not found with this id=${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const uodatedhighlight = await this.packageHighlightRepo.update({ HiId }, { ...updateHighlightDto })
    return uodatedhighlight;
  }


  // Delete exclusions
  async DeleteHighlight(Id: number, HiId: number) {
    const tourpackage = await this.travelPackageRepo.findOne({
      where: {
        Id
      }
    })
    if (!tourpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const highlight = await this.packageHighlightRepo.findOne({ where: { HiId } })
    if (!highlight) {
      throw new HttpException(
        `Inclsuions not found with this id=${HiId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.packageHighlightRepo.delete(HiId);
  }




}

