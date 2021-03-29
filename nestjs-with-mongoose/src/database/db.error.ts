export class DbError extends Error {
  public constructor(message = 'Unknown database error') {
    super(message);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class DbConfigError extends DbError {
  public constructor(message = 'Database configuration error') {
    super(message);
  }
}
