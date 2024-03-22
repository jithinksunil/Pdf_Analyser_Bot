import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  constructor(
    private config: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.config.get('OPENAI_API_KEY'),
    });
  }
  openai: OpenAI
  async analyseWithOpenAi(context: string, question: string) {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a question answer expert based on the context provided',
        },
        {
          role: 'user',
          content: `Context is ${context}`,
        },
        {
          role: 'system',
          content:
            'The context is provided. Now analyse the context and answer the following question',
        },
        {
          role: 'user',
          content: `Question is ${question}`,
        },
        {
          role: 'system',
          content:
            'Give the answer now , if you cannot give the exact answer , politely say I am unable to anser the question based the given context',
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    const answer = chatCompletion.choices[0].message.content;
    return answer;
  }
}
