import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService]
})
export class GoogleModule {}
