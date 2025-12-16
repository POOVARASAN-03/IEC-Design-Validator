import {
  IsOptional,
  IsString,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CableDesignDto } from './cable-design.dto';

export class ValidateDesignRequestDto {

  // Semi-free-text input
  @ValidateIf(o => !o.data)
  @IsString()
  text?: string;

  // Structured JSON (DB / API input)
  @ValidateIf(o => !o.text)
  @ValidateNested()
  @Type(() => CableDesignDto)
  data?: CableDesignDto;
}
