import { Injectable } from "@nestjs/common";
import { Saga, ICommand, ofType, CommandHandler } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { delay, map } from "rxjs/operators";

@Injectable()
export class UsersSagas {
    constructor() {}

    @Saga()
    userCreated = (events$: Observable<any>): Observable<ICommand> => {

        return events$
            .pipe(
                ofType(UserCreatedEvent),
                delay(1000),
                map((event) => {
                    console.log('Inside [UserSagas] Saga ' 
                    + 'for example send a email');
                    return null;
                }),
            );
    }
}