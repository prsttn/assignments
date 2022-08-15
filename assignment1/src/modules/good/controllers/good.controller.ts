import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddGoodDto } from '../dtos/addGood.dto';
import { EditGoodDto } from '../dtos/editGood.dto';
import { FilterGoodsDto } from '../dtos/filterGoods.dto';
import { GoodService } from '../services/good.service';

@Controller('good')
export class GoodController {
  constructor(private goodService: GoodService){}

  @Get('list')
  async getGoodsList() {
    const goods = await this.goodService.getGoodsList();
    return { goods };
  }

  @Post('filter')
  async filterGoods(@Body() filters: FilterGoodsDto) {
    let goods = await this.goodService.filterGoodsViaDetails(filters);
    return { goods };
  }

  @Get('translated-details')
  async getTranslatedGood(@Body('_id') _id:string) {
    let good = await this.goodService.getTranslatedGoodById(_id);
    return good;
  }

  @Get('stats')
  async get() {
    let stats = await this.goodService.countGoodsByCategory();
    return { stats };
  }

  @Get('original-details')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOriginalGood(@Body('_id') _id:string) {
    let good = await this.goodService.getOriginalGoodById(_id);
    return good;
  }

  @Post('add')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addGood(@Body() addGoodDto: AddGoodDto) {
    let good = await this.goodService.addGood(addGoodDto);
    return { good };
  }

  @Put('edit-details')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async editGood(@Body() editGoodDto: EditGoodDto) {
    let good = await this.goodService.editGood(editGoodDto);
    return { good };
  }

  @Delete('remove')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeGood(@Body('_id') _id: string) {
    let good = await this.goodService.deleteGoodById(_id);
    return { good };
  }
 }
