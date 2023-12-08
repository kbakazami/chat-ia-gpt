import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatGptAIService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly service: ChatGptAIService) {}

  @WebSocketServer()
  server: Server;

  private clients: { client: Socket; username: string }[] = [];

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log({ payload });
    this.server.emit('message', payload);
    return 'Hello world!';
  }

  @SubscribeMessage('translate')
    handleTranslate(client: Socket, payload: any): void {
    this.service.translate(payload.language, payload.content).then((text) => {
    client.emit('translate', text);
    });
  }

  @SubscribeMessage('user-take')
  handleUserTake(client: Socket, payload: any): void {
    const index = this.clients.findIndex(
        ({ client: _client }) => _client.id === client.id,
    );

    this.clients.splice(index, 1, { client, username: payload });
  }

  @SubscribeMessage('user-check')
  handleUserCheck(client: Socket, payload: any): void {
    client.emit(
        'user-exist',
        this.clients.some(({ username: u }) => u === payload),
    );
  }

  @SubscribeMessage('check')
    handleCheck(client: Socket, payload: any): void {
      this.service.check(payload.content).then((text) => {
      client.emit('check', text);
    });
  }

    @SubscribeMessage('suggest')
    handleSuggest(client: Socket, payload: any): void {
        this.service.suggest(payload.content).then((text) => {
        client.emit('suggest', text);
        });
    }

  handleConnection(client: any, ...args: any[]) {
    this.clients.push({ client, username: '' });
    console.log({ id: client.id });
  }
  handleDisconnect(client: any) {
    this.clients = this.clients.filter(
        ({ client: _client }) => _client.id !== client.id,
    );
    console.log({ disconnectid: client.id });
  }
}