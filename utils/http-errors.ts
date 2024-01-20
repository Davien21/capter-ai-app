export class HttpError extends Error {
  counter: number;
  headers: [Headers];
  status: number;
  url: string;
  date: Date;
  constructor(message: string, status: number = 500) {
    super(message);
    this.counter = 0;
    this.headers = [{}] as [Headers];
    this.status = status;
    this.url = "";
    this.date = new Date();

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }
}
