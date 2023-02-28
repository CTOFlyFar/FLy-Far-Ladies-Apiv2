import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelpackageDto } from './create-travelpackage.dto';

export class UpdateTravelpackageDto extends PartialType(CreateTravelpackageDto) {}
