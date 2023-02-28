
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travelpackage } from 'src/travelpackage/entities/travelpackage.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateBookingPolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { BookingPolicy } from './entities/policy.entity';

@Injectable()
export class BookingPolicyService {
  constructor(
    @InjectRepository(BookingPolicy) private bookingPolicyRepo:Repository<BookingPolicy>,
    @InjectRepository(Travelpackage) private travelpackageRepo:Repository<Travelpackage>){}
  
 async create(Id:number,createBookingPolicyDto:CreateBookingPolicyDto) {
  const Travelpackage = await this.travelpackageRepo.findOne({where:{Id}})
      if (!Travelpackage) {
        throw new HttpException(
          "TourPackage not found, cann't add policy",
          HttpStatus.BAD_REQUEST,
        );
      }
  const policy= await this.bookingPolicyRepo.create(createBookingPolicyDto);
  const savePolicy= await this.bookingPolicyRepo.save(policy);
  return savePolicy;
    
  }

 async findAll() {
    const policy= await this.bookingPolicyRepo.find();
    return policy;
  }

 async findOne(Id: number) {
    const policy= await this.bookingPolicyRepo.findOne({where:{Id}});
    return policy;
  }

 async update(Id: number, updatePolicyDto: UpdatePolicyDto) {
    const updatepolicy = await this.bookingPolicyRepo.update({Id},{...updatePolicyDto});
    return updatepolicy;
  }
  
  async remove(Id: number) {
    const deletepolicy= await this.bookingPolicyRepo.delete(Id);
    return deletepolicy;
  }
}
