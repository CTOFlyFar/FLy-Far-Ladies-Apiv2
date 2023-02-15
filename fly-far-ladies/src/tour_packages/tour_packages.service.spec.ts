import { Test, TestingModule } from '@nestjs/testing';
import { TourPackagesService } from './tour_packages.service';

describe('TourPackagesService', () => {
  let service: TourPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourPackagesService],
    }).compile();

    service = module.get<TourPackagesService>(TourPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
