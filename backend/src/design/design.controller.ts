import { Controller, Post, Body } from '@nestjs/common';
import { DesignService } from './design.service';
import { ValidateDesignRequestDto } from './dto/validate-design-request.dto';
@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post('validate')
  validateJson(@Body() dto: ValidateDesignRequestDto) {
    return this.designService.validate(dto);
  }


}