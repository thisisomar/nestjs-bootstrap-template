import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './modules/redis/redis.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { REDIS } from 'modules/redis/redis.constants';
import RedisStore from 'connect-redis';
import { join } from 'path';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      playground: true,
    }),
    UserModule,
    AuthModule,
    RedisModule,
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({
            client: this.redis,
          }),
          name: 'session_id',
          secret: 'secret',
          resave: false,
          saveUninitialized: false,
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}