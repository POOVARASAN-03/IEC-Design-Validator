import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { AiValidationResponseDto } from './dto/ai-validation-response.dto';

@Injectable()
export class DesignService {
  constructor(private readonly gemini: GeminiService) {}

  async validate(input: any): Promise<AiValidationResponseDto> {

    
      if (input.text) {
        return this.gemini.analyze({ text: input.text });
      }

      if (input.data) {
        return this.gemini.analyze(input.data);
      }
 
    throw new Error('Either text or data must be provided');
  }
}
