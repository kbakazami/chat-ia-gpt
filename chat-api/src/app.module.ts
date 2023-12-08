import { Module } from '@nestjs/common';
import {MessageModule} from "./chat/message.module";
import {ChatGptAIService} from "./chat/message.service";

@Module({
  imports: [MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
