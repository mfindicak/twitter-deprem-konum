import { IsArray, IsString } from 'class-validator';

export class SearchAddressDto {
  @IsArray()
  @IsString({ each: true })
  addresses: string[];
}
