import { IsString } from 'class-validator';

export class SearchTweetDto {
  @IsString()
  query: string;
}
