import { BaseException } from "./base.exception";

export class UserNotFoundException extends BaseException {
  constructor() {
    super('USER_NOT_FOUND', 'User not found');
  }
}
