import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/configurations/openAi/openAi.service';
const pdf = require('pdf-parse');
const fs = require('fs');
import axios from 'axios';

@Injectable()
export class CommonService {
  constructor(private openAiService: OpenAiService) {}
  async analyseWithAi(context: string, question: string) {
    return await this.openAiService.analyseWithOpenAi(context, question);
  }

  async extractFromFile(path: string) {
    const response = await axios.get(path, {
      responseType: 'arraybuffer',
    });
    // let dataBuffer = fs.readFileSync(path);//to get local files
    const dataBuffer = Buffer.from(response.data, 'binary');
    const data = await pdf(dataBuffer);
    return data.text;
  }
}
