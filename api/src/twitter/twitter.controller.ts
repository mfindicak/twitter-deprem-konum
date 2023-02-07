import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchTweetDto } from './dto/search-tweet';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('/search')
  searchTweets(@Body() body: SearchTweetDto) {
    return this.twitterService.searchTweets(body);
  }

  @Get('/location')
  searchLocation() {
    return this.twitterService.searchLocation();
  }
}
