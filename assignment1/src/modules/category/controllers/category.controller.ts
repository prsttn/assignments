import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { CategoryService } from '../services/category.service';

@Controller('category')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private catgoryService: CategoryService) {}
  
  @Get('/list')
  async getCategories() {
    const categories = await this.catgoryService.getCategories()
    return { categories };
  }

  @Post('create')
  async createCategories(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.catgoryService.createCategory(createCategoryDto);
    return { category };
  }

}
