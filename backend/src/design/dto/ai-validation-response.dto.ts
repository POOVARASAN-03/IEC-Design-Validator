import { CableDesignDto } from './cable-design.dto';
import { ValidationResultDto } from './validation-result.dto';
import { ConfidenceDto } from './confidence.dto';

export class AiValidationResponseDto {
  fields: CableDesignDto;
  validation: ValidationResultDto[];
  ai_reasoning: string;
  confidence: ConfidenceDto;
}
