import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiValidationResponseDto } from '../design/dto/ai-validation-response.dto';

@Injectable()
export class GeminiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async analyze(input: any): Promise<AiValidationResponseDto> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const prompt = `
            You are an IEC cable design validation expert.

            Input:
            ${JSON.stringify(input, null, 2)}

          Rules:
            - First, determine if the input is related to cable design (voltage, conductor, insulation, etc.)
            - If the input is NOT related to cable design at all (e.g., random text, unrelated topics), return a validation with field "input" and status "FAIL" with comment explaining it's not valid cable design input
            - Extract ONLY values that are explicitly mentioned in the input text or JSON
            - Do NOT guess, infer, or assume values that are not present
            - If a value is clearly stated (e.g., "10 sqmm", "Cu", "PVC 1.0 mm", "0.6/1 kV"), extract it
            - If a value is missing or ambiguous, omit that field
            - Follow IEC 60502-1 and IEC 60228 for validation of extracted values
            - Return ONLY valid JSON
            - Do NOT include markdown, code fences, or explanations
            - Generate a concise natural-language explanation summarizing WHY the overall validation passed, failed, or has warnings
            - This explanation MUST be written by you (the AI)
            - Put this explanation inside a field called "ai_reasoning"
            - Confidence "overall" MUST be a floating-point number between 0.0 and 1.0
            - Example valid confidence values: 0.87, 0.91, 0.65
            - Example invalid confidence values: 1, 0, 100, "90%"
            - For invalid cable design input, set confidence to 0.0

            Required JSON format:
            {
              "fields": {...},
              "validation": [
                {
                  "field": "",
                  "provided": "",
                  "status": "PASS | FAIL | WARN",
                  "expected": "",
                  "comment": ""
                }
              ],
              "ai_reasoning": "",
              "confidence": {
                "overall": 0.0
              }
            }
            `;

    let result;
    let retries = 3;
    
    while (retries > 0) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error: any) {
        retries--;
        if (retries === 0 || error.status !== 503) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    const raw = result.response.text();
    const clean = raw
      .replace(/```json/g, '')
      .replace(/```/g, '');

    try {
      return JSON.parse(clean) as AiValidationResponseDto;
    } catch (err) {
      throw new InternalServerErrorException(
        'AI response is not valid JSON'
      );
    }
  }
}
