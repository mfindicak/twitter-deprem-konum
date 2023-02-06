import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { GoogleService } from 'src/google/google.service';

@Module({
  controllers: [TwitterController],
  providers: [TwitterService, GoogleService],
})
export class TwitterModule {}
