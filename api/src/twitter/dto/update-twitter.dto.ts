import { PartialType } from '@nestjs/mapped-types';
import { CreateTwitterDto } from './create-twitter.dto';

export class UpdateTwitterDto extends PartialType(CreateTwitterDto) {}
