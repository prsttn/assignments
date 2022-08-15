import { Module } from '@nestjs/common';
import { GoodService } from './services/good.service';
import { GoodController } from './controllers/good.controller';
import { goodProviders } from './providers/good.provider';
import { GoodTools } from './services/tools.service';

@Module({
  providers: [GoodService, GoodTools, ...goodProviders],
  controllers: [GoodController]
})
export class GoodModule {}
