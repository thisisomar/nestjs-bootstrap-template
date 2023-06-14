import { Injectable } from '@nestjs/common';
import { User } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return null;
    }

    return user;
  }
}
