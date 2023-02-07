import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { GoogleService } from 'src/google/google.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/twitter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TwitterController],
  providers: [TwitterService, GoogleService],
})
export class TwitterModule {}
