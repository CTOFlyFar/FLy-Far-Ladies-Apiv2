
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { UpdateImageDto } from './dto/update-image.dto';
import { image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(image) private imageRepo: Repository<image>){}
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
