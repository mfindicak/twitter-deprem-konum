import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleDto } from './create-google.dto';

export class UpdateGoogleDto extends PartialType(CreateGoogleDto) {}
