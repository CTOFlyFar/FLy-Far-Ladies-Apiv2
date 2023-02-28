import { Test, TestingModule } from '@nestjs/testing';
import { TravelpackageService } from './travelpackage.service';

describe('TravelpackageService', () => {
  let service: TravelpackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelpackageService],
    }).compile();

    service = module.get<TravelpackageService>(TravelpackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
