import { Args, GqlExecutionContext, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from 'modules/user/user.entity';
import { LoginUserDto, SignUpUserInput } from './dto/auth.dto';
import { UserService } from 'modules/user/user.service';
import { ExecutionContext, UseGuards, createParamDecorator } from '@nestjs/common';
import { GQLAuthGuard } from './guards/gql-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver()
export class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  public async register(
    @Args('input') input: SignUpUserInput,
  ): Promise<User> {
    const user = await this.userService.createUser(input);

    return user;
  }
  
  @UseGuards(GQLAuthGuard)
  @Mutation(() => User)
  public async login(
    @CurrentUser() user: User,
    @Args('input') input: LoginUserDto
  ): Promise<User> {
    return user;
  }
}
