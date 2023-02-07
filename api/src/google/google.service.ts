import { Injectable } from '@nestjs/common';
import { Tweet } from 'src/twitter/entities/twitter.entity';
import { SearchAddressDto } from './dto/search-address';

@Injectable()
export class GoogleService {
  async getGeo(tweets: SearchAddressDto[]): Promise<Tweet[]> {
    const maxLat = 38.5;
    const minLat = 35.8;
    const maxLng = 40;
    const minLng = 35;
    let result = await Promise.all<any[]>(
      tweets.map((tweet) => {
        const address = tweet.text;
        return fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLEAPIKEY}`,
        )
          .then((response) => {
            return response.json();
          })
          .then((jsonData) => {
            if (
              jsonData.results[0]?.geometry &&
              jsonData.results[0]?.geometry.location.lat < maxLat &&
              jsonData.results[0]?.geometry.location.lat > minLat &&
              jsonData.results[0]?.geometry.location.lng < maxLng &&
              jsonData.results[0]?.geometry.location.lng > minLng
            ) {
              return {
                tweet: address,
                lat: jsonData.results[0].geometry.location.lat,
                lng: jsonData.results[0].geometry.location.lng,
                tweetDate: tweet.created_at,
                tweetId: tweet.id,
                userId: tweet.author_id,
              };
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }),
    );
    result = result.filter((result) => result);
    return result;
  }
}
