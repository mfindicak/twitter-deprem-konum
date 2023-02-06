import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/google/google.service';
import { SearchTweetDto } from './dto/search-tweet';

@Injectable()
export class TwitterService {
  constructor(private googleService: GoogleService) {}

  async searchTweets(
    data: SearchTweetDto,
  ): Promise<{ status: number; data?: any; meta?: any }> {
    return fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${data.query}&max_results=100`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${process.env.TWITTERAPIKEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return { status: 200, data: data.data, meta: data.meta };
      })
      .catch((error) => {
        console.log(error);
        return { status: 404 };
      });
  }

  async searchLocation(data: SearchTweetDto) {
    const results = await this.searchTweets(data);
    if (results.status == 200) {
      const tweets = results.data.map((result) => result.text);
      const locations = await this.googleService.getGeo({ addresses: tweets });
      return locations;
    }
    return { status: 404 };
  }
}
