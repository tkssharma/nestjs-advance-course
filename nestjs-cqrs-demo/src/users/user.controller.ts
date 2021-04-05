import { Get, Post, Delete, Param, Controller, Body } from '@nestjs/common';
import { Request } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';

export class SignUp { 
    email: string;
    username: string;
    password: string;
};

@Controller('profiles')
export class UserController {
    constructor(private readonly commandBus: CommandBus,
    ) { }

    @Post('signup')
    public async signup(@Body('input') input: SignUp) {
        try {
            return await this.commandBus.execute(
                new CreateUserCommand(input.username,
                    input.email, input.password));
        } catch (errors) {
            console.log("Caught promise rejection (validation failed). Errors: ", errors);
        }
    }
}