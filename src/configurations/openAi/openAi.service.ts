import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  constructor(private config: ConfigService) {
    const openai = new OpenAI({
      apiKey: this.config.get('OPENAI_API_KEY'),
    });
    this.openai = openai;
  }
  openai: OpenAI;
}
