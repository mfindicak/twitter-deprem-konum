import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';
import { GoogleModule } from './google/google.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TwitterModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
