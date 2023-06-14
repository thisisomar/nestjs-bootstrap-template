import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { SignupUserInput } from './dto/user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  async createUser(signupInput: SignupUserInput): Promise<User> {
    const newUser = this.userRepository.create(signupInput);
    newUser.password = await bcrypt.hash(signupInput.password, 10);

    await this.em.persistAndFlush(newUser);
  
    return newUser;
  };

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOne({ email });

    if (!user) {
      throw new UserNotFoundError(); 
    }

    return user;
  }
}
