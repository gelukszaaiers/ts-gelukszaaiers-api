import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { seedsProviders } from './seeds.providers';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';

@Module({
  controllers: [SeedsController],
  modules: [DatabaseModule],
  components: [
    ...seedsProviders,
    SeedsService,
  ],
})

export class SeedModule {}
