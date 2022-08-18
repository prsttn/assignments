import {Module} from '@nestjs/common';
import {CategoryService} from './services/category.service';
import {CategoryController} from './controllers/category.controller';
import {categoryProviders} from './providers/category.provder';
@Module({
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],
})
export class CategoryModule {}
