import { Test, TestingModule } from '@nestjs/testing';
import { TourpackagesService } from './tourpackages.service';

describe('TourpackagesService', () => {
  let service: TourpackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourpackagesService],
    }).compile();

    service = module.get<TourpackagesService>(TourpackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
