import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private ImageREpo:Repository<Image>){}

async findAll() {
    return await this.ImageREpo.find({}) ;
  }

async findOne(ImageId: number) {
  const image= await this.ImageREpo.findOneBy({ImageId});
  if(!image){
    throw new HttpException(`ImageId not found with this Id= ${ImageId}`, HttpStatus.BAD_REQUEST)
  }
  return image;
  }

async update(ImageId: number, updateImageDto: UpdateImageDto) {
  const updateimage= await this.ImageREpo.update({ImageId}, {...updateImageDto});
  return updateimage;
  }

async remove(ImageId: number) {
  const image= await this.ImageREpo.delete(ImageId);
  if(!image){
    throw new HttpException(`image not found with this Id = ${ImageId}`, HttpStatus.BAD_REQUEST);
  }
  return image;
  }
}
