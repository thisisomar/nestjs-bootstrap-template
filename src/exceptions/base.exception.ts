// base exception that can be used for both GQL and REST errors
export class BaseException extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}