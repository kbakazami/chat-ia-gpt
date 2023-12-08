import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import {ChatGptAIService} from "./message.service";

@Module({
  providers: [MessageGateway, ChatGptAIService],
})
export class MessageModule {}