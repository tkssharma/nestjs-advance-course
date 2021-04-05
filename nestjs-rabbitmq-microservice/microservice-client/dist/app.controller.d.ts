import { ClientProxy } from '@nestjs/microservices';
export declare class AppController {
    private readonly client;
    constructor(client: ClientProxy);
    onApplicationBootstrap(): Promise<void>;
    getHello(): string;
}
