import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>){}
  findAll() {
    return this.imageRepo.find({});
  }
findOneById(Id:number) {
    return this.imageRepo.findOneBy({Id})
}

  update(Id: number, updateImageDto: UpdateImageDto) {
    return this.imageRepo.update({Id}, {...updateImageDto});
  }

  remove(Id: number) {
    return this.imageRepo.delete(Id);
  }
}
