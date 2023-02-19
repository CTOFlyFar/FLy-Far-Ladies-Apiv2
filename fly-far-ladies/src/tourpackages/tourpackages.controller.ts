import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourpackagesService } from './tourpackages.service';
import { UpdateTourpackageDto } from './dto/update-tourpackage.dto';
import { CreateTourPackageDto } from './dto/create-tourpackage.dto';

@Controller('tourpackages')
export class TourpackagesController {
  constructor(private readonly tourpackagesService: TourpackagesService) {}

  @Post('AddTravelPackage')
  create(@Body() createTourpackageDto: CreateTourPackageDto) {
    return this.tourpackagesService.create(createTourpackageDto);
  }

  @Get('AllPackages')
  findAll() {
    return this.tourpackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourpackagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourpackageDto: UpdateTourpackageDto) {
    return this.tourpackagesService.update(+id, updateTourpackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourpackagesService.remove(+id);
  }
}
