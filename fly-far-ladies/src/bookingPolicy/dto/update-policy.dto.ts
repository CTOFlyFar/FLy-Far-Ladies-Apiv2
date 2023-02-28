import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingPolicyDto } from './create-policy.dto';


export class UpdatePolicyDto extends PartialType(CreateBookingPolicyDto) {}
