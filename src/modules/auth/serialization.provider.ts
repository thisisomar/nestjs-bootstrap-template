import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    done(null, payload);
  }
}
