
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './Dto/create-userprofile.dto';
import { updateUserProfileDto } from './Dto/update-userprofile.dto';
import { Userprofile } from './entitties/userprofile.entities';




@Injectable()
export class UserProfileServices{
   constructor(@InjectRepository(Userprofile)private profileRepository:Repository<Userprofile>){}

   // Addd traveller
   async AddProfile(userprofileDto:CreateUserProfileDto){
      const profile= await this.profileRepository.create(userprofileDto);
      const saveprofile = await this.profileRepository.save(profile);
      return saveprofile
   }
    

      // get All User
      async FindAllProfile() {
         const Profile = await this.profileRepository.find({});
         if (!Profile) {
            throw new HttpException("user Profile not found", HttpStatus.BAD_REQUEST);
         }
         return Profile;
      }

   // find user by Id
   async FindProfile(Id: string): Promise<Userprofile> {
      const Profile = await this.profileRepository.findOne({ where:{Id} });
      if (!Profile) {
         throw new HttpException("Profile not found", HttpStatus.BAD_REQUEST);
      }
      return Profile;
   }

   // update user
   async UpdateProfile(Id:string, updtetProfilrDto:updateUserProfileDto){
      const updtetProfileDto = await this.profileRepository.update({Id}, {...updtetProfilrDto})
      return updtetProfileDto;
   }
   
   // Delte User
   async DeleteProfile(Id:string){
      const Profile = await this.profileRepository.delete(Id)
      return Profile;
   }
}