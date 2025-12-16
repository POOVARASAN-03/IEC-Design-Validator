import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { AiValidationResponseDto } from './dto/ai-validation-response.dto';

@Injectable()
export class DesignService {
  constructor(private readonly gemini: GeminiService) {}
  async validateById(id: string) {
    const dbRecord = await this.fetchDesignById(id);
    if (!dbRecord) {
      throw new Error('Design not found');
    }else{
      return this.gemini.analyze(dbRecord);
    }
  }
  async validate(input: any): Promise<AiValidationResponseDto> {

    
      if (input.text) {
        return this.gemini.analyze({ text: input.text });
      }

      if (input.data) {
        return this.gemini.analyze(input.data);
      }
 
    throw new Error('Either text or data must be provided');
  }
    private async fetchDesignById(id: string) {
    // Mock database fetch - replace with actual DB logic
    return {
      id,
      standard: 'IEC 60502-1',
      voltage: '1.1 kV',
      conductor_material: 'Copper',
      conductor_class: 'Class 2',
      cross_section_area: 10,
      insulation_material: 'PVC',
      insulation_thickness: 1.0,
    };
  }
}
  
