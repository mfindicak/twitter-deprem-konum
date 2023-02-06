import { Body, Controller, Post } from '@nestjs/common';
import { SearchAddressDto } from './dto/search-address';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post('/find')
  getGeoCode(@Body() body: SearchAddressDto) {
    return this.googleService.getGeo(body);
  }
}
