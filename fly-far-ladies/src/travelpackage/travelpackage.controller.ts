import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelpackageService } from './travelpackage.service';
import { CreateTravelpackageDto } from './dto/create-travelpackage.dto';
import { UpdateTravelpackageDto } from './dto/update-travelpackage.dto';

@Controller('travelpackage')
export class TravelpackageController {
  constructor(private readonly travelpackageService: TravelpackageService) {}

  @Post('addtravelpackage')
  create(@Body() createTravelpackageDto: CreateTravelpackageDto) {
    return this.travelpackageService.create(createTravelpackageDto);
  }

  @Get('alltravelpackage')
  findAll() {
    return this.travelpackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelpackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelpackageDto: UpdateTravelpackageDto) {
    return this.travelpackageService.update(+id, updateTravelpackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelpackageService.remove(+id);
  }
}
