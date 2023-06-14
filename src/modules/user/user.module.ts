import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
