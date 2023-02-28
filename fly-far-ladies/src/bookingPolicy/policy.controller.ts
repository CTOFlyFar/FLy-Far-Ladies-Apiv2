import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { CreateBookingPolicyDto } from './dto/create-policy.dto';
import { BookingPolicyService } from './policy.service';

@Controller('bookingpolicy')
export class PolicyController {
  constructor(private readonly BookingpolicyService: BookingPolicyService) {}
  @Post(':id/addpolicy')
  create(Id:number,@Body() createBookingPolicyDto:CreateBookingPolicyDto ) {
    return this.BookingpolicyService.create(Id,createBookingPolicyDto);
  }

  @Get(':id/allpolicy')
  findAll() {
    return this.BookingpolicyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.BookingpolicyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.BookingpolicyService.update(+id, updatePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.BookingpolicyService.remove(+id);
  }
}
