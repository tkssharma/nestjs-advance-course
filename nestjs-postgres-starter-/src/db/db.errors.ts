export class DbError extends Error {
  public constructor(message = 'Unknown database error') {
    super(message);
  }
}

export class DbConfigError extends DbError {
  public constructor(message = 'Database configuration error') {
    super(message);
  }
}
