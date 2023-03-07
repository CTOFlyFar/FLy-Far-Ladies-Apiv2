
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTravellerDto } from './Dto/create-traveller.dto';
import { updateTravellerDto } from './Dto/update-traveller.dto';
import { Traveller } from './entities/traveller.entity';



@Injectable()
export class TravellerServices{
   constructor(@InjectRepository(Traveller)private tarvellerRepository:Repository<Traveller>){}

   // Addd traveller
   async AddTraveller(tarvellerDto:CreateTravellerDto){
      const tarveller= await this.tarvellerRepository.create(tarvellerDto);
      const savetraveller = await this.tarvellerRepository.save(tarveller);
      return savetraveller
   }
    

      // get All User
      async FindAllTraveller() {
         const traveller = await this.tarvellerRepository.find({});
         if (!traveller) {
            throw new HttpException("Traveller not found", HttpStatus.BAD_REQUEST);
         }
         return traveller;
      }

   // find user by Id
   async FindTrveller(Id: string): Promise<Traveller> {
      const traveller = await this.tarvellerRepository.findOne({ where:{Id} });
      if (!traveller) {
         throw new HttpException("traveller not found", HttpStatus.BAD_REQUEST);
      }
      return traveller;
   }

   // update user
   async UpdateTravller(Id:string, updtetravellerDto:updateTravellerDto){
      const updatetraveller = await this.tarvellerRepository.update({Id}, {...updtetravellerDto})
      return updatetraveller;
   }
   
   // Delte User
   async DeleteTraveller(Id:string){
      const traveller = await this.tarvellerRepository.delete(Id)
      return traveller;
   }
}