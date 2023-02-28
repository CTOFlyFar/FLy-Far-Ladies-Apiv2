import { Test, TestingModule } from '@nestjs/testing';
import { TravelpackageController } from './travelpackage.controller';
import { TravelpackageService } from './travelpackage.service';

describe('TravelpackageController', () => {
  let controller: TravelpackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelpackageController],
      providers: [TravelpackageService],
    }).compile();

    controller = module.get<TravelpackageController>(TravelpackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
