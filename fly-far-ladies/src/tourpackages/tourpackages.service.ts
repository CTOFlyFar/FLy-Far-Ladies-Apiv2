import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { tourpackage } from './entities/tourpackage.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { packageincluded } from './entities/PackageInclude.entity';
import { createPackageIncludeDto } from './dto/crteate-packageInlcude.dto';
import { createpackageincluionDto } from './dto/create-packageInclusion.dto';
import { packageinclusion } from './entities/packageInclusion.entitry';
import { tourpackageplan } from './entities/tourpackageplan.entity';
import { CreateTourPackagePlanDto } from './dto/create-packagetourplan.dto';

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
  ) {}

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
        packageincluded: true,
        cartimage: true,
        PackageInclusions: true,
        tourpackageplans: true,
      },
    });
  }

  async findOne(Id: number) {
    const tarvelpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!tarvelpackage) {
      throw new HttpException(
        `TourPackage not found with this id=${Id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async AddpackageIncluded(
    Id: number,
    PackgeincludedDto: createPackageIncludeDto,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const Addincluded = await this.packageIncludeRepo.create(PackgeincludedDto);
    const savepackageincluded = await this.packageIncludeRepo.save(Addincluded);
    Tourpackage.packageincluded = savepackageincluded;
    return await this.travelPackageRepo.save(Tourpackage);
  }

  async AddpackageInclusions(
    Id: number,
    PackgeinclusionsDto: createpackageincluionDto,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const newInclusions = this.packageInclusionRepo.create(PackgeinclusionsDto);
    const savepackageinclusion = await this.packageInclusionRepo.save(
      newInclusions,
    );
    Tourpackage.PackageInclusions = savepackageinclusion;
    return await this.travelPackageRepo.save(Tourpackage);
  }

  async AddTourpackagePlan(
    Id: number,
    tourpackageplandto: CreateTourPackagePlanDto,
  ) {
    const Tourpackage = await this.travelPackageRepo.findOneBy({ Id });
    if (!Tourpackage) {
      throw new HttpException(
        "TourPackage not found, cann't add cover image",
        HttpStatus.BAD_REQUEST,
      );
    }
    const createpackageplan =
      this.tourpackagePanRepo.create(tourpackageplandto);
    const savenewpackageplan = await this.tourpackagePanRepo.save(
      createpackageplan,
    );
    Tourpackage.tourpackageplans = savenewpackageplan;
    return await this.travelPackageRepo.save(Tourpackage);
  }
}
