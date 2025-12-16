import { Module } from '@nestjs/common';
import { DesignModule } from './design/design.module';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [DesignModule, GeminiModule],
})
export class AppModule {}
