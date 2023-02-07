import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleService } from 'src/google/google.service';
import { Repository } from 'typeorm';
import { SearchTweetDto } from './dto/search-tweet';
import { Tweet } from './entities/twitter.entity';

@Injectable()
export class TwitterService {
  constructor(
    private googleService: GoogleService,
    @InjectRepository(Tweet)
    private tweetRepo: Repository<Tweet>,
  ) {}

  async searchTweets(data: SearchTweetDto): Promise<{
    status: number;
    data?: { author_id: string; text: string; id: string; created_at: Date }[];
    meta?: any;
  }> {
    return fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${
        data.query
      }&expansions=author_id&tweet.fields=created_at&sort_order=recency&max_results=100${
        data.start_time ? `&start_time=${data.start_time.toISOString()}` : ''
      }`,
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

  async searchLocation() {
    const result = await this.tweetRepo.find({
      order: { id: 'DESC' },
      select: ['tweetId', 'tweet', 'lat', 'lng', 'tweetDate'],
      take: 100,
    });
    return result;
  }

  //Every 20 seconds
  @Cron('*/20 * * * * *')
  async searchLocationCron() {
    const lastTweet = await this.tweetRepo
      .findOne({
        order: { tweetDate: 'DESC' },
        select: ['tweetDate'],
        where: {},
      })
      .then((tweet) => tweet.tweetDate)
      .catch((error) => console.log(error));
    const results = await this.searchTweets({
      query: 'mah apt -is:retweet',
      start_time: lastTweet ? lastTweet : undefined,
    });
    if (results.status == 200) {
      const tweets = await this.googleService.getGeo(results.data);
      if (tweets && tweets.length > 0)
        this.tweetRepo
          .createQueryBuilder()
          .insert()
          .into(Tweet)
          .values(tweets)
          .orIgnore(`("id") DO NOTHING`)
          .execute();
    }
  }
}
