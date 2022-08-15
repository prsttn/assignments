import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { categoryProviders } from './providers/category.provder';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { magicalStrings as keys} from '../../configs/magicalStrings'
import { CategorySchema } from 'src/schemas/category.schema';
@Module({
  providers: [CategoryService, ...categoryProviders],
  controllers: [CategoryController],  
})
export class CategoryModule {}
