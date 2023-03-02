import { CartImageDto } from './create-image.dto';
import { PartialType } from '@nestjs/swagger';


export class UpdateImageDto extends PartialType(CartImageDto) {}
