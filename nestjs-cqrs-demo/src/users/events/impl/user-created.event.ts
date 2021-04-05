export class UserCreatedEvent {
    constructor(
        public readonly userId: string,
    ) {}
}