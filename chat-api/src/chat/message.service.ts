import OpenAI from 'openai';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ChatGptAIService {
    openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async translate(language: string, text: string): Promise<string> {
        console.log({language, text})
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user', content: `Translate in ${language} : ${text}`
                }
            ],
        });

        return response.choices[0].message.content;
    }

    async check(text: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user', content: `Check the informations : ${text}`
                }
            ]
        });

        return response.choices[0].message.content;
    }

    async suggest(text: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user', content: `Suggest : ${text}`
                }
            ]
        });

        return response.choices[0].message.content;
    }
}