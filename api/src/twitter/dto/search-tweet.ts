import { IsDateString, IsString } from 'class-validator';

export class SearchTweetDto {
  @IsString()
  query: string;

  @IsDateString()
  start_time?: Date;
}
