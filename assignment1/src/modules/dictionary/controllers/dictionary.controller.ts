import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddWordDto } from '../dtos/dictionary.dto';
import { DictionaryService } from '../services/dictionary.service';

@Controller('dictionary')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService){}

  @Get('list')
  async getWordsList() {
    let words = await this.dictionaryService.getWordsList();
    return { words };
  }

  @Post('add')
  async addWord(@Body() addWordDto: AddWordDto[]) {
    let word = await this.dictionaryService.addWord(addWordDto);
    return { word };
  }
}
