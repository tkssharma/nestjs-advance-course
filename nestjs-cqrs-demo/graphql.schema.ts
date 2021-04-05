
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Signup {
    username: string;
    email: string;
    password: string;
}

export class SignupResponse {
    username: string;
    email: string;
}

export class AuthPayload {
    email: string;
}

export abstract class IMutation {
    abstract signup(input: Signup): SignupResponse | Promise<SignupResponse>;

    abstract login(username: string, password: string): AuthPayload | Promise<AuthPayload>;
}

export class User {
    userId: string;
    username?: string;
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract me(): string | Promise<string>;
}
