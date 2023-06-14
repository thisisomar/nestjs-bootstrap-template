import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { IsAuthenticated } from 'shared/guards/authenticated.guard';

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseGuards(IsAuthenticated)
  public async hello(): Promise<string> {
    return 'Hello World!';
  }
}
