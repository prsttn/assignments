import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './decorators/roles.decorators';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor() {}
  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { path: `public/${file.originalname}` };
  }
}
