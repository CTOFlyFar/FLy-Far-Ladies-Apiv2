
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { BookingPolicy } from './entities/policy.entity';
import { BookingPolicyService } from './policy.service';
import { Travelpackage } from 'src/travelpackage/entities/travelpackage.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookingPolicy, Travelpackage])],
  controllers: [PolicyController],
  providers: [BookingPolicyService]
})
export class PolicyModule {}
