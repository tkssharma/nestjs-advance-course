import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) { }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    return 'Hello World printed';
  }
}
