import { PartialType } from '@nestjs/swagger';
import { CreateImageDto } from 'src/image/dto/create-image.dto';


export class UpdateImageDto extends PartialType(CreateImageDto) {}
