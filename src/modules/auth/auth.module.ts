import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true
    })
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
