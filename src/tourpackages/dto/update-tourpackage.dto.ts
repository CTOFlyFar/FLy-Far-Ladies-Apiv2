import { PartialType } from '@nestjs/swagger';
import { CreateTourPackageDto } from './create-tourpackage.dto';

export class UpdateTourpackageDto extends PartialType(CreateTourPackageDto) {}
