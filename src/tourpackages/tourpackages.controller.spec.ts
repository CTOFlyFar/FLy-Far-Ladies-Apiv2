import { Test, TestingModule } from '@nestjs/testing';
import { TourpackagesController } from './tourpackages.controller';
import { TourpackagesService } from './tourpackages.service';

describe('TourpackagesController', () => {
  let controller: TourpackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourpackagesController],
      providers: [TourpackagesService],
    }).compile();

    controller = module.get<TourpackagesController>(TourpackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
