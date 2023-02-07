import { IsDateString, IsString } from 'class-validator';

export class SearchAddressDto {
  @IsString()
  author_id: string;

  @IsString()
  text: string;

  @IsString()
  id: string;

  @IsDateString()
  created_at: Date;
}
