import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from './modules/database/database.module';
import {AuthModule} from './modules/auth/auth.module';
import {UserModule} from './modules/user/user.module';
import {UserController} from './modules/user/controllers/user.controller';
import {AuthController} from './modules/auth/controllers/auth.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {appProviders} from './app.provider';
import {AuthService} from './modules/auth/services/auth.service';
import {JwtModule} from '@nestjs/jwt';
import {CategoryModule} from './modules/category/category.module';
import {GoodModule} from './modules/good/good.module';
import {DictionaryModule} from './modules/dictionary/dictionary.module';
import {ConfigModule} from '@nestjs/config';
import dbConfig from './configs/database';
import {MulterModule} from '@nestjs/platform-express';
import {multerOptions} from './configs/multerConfig';
import jwtOptions from './configs/jwtConfig';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(dbConfig().connectionURL),
    MulterModule.register(multerOptions),
    JwtModule.register(jwtOptions()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    GoodModule,
    DictionaryModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, ...appProviders, AuthService],
})
export class AppModule {
  constructor(private appService: AppService) {}
  async onModuleInit() {
    await this.appService.createAdminUser();
  }
}
