/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GQLAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(
      context,
    )) as unknown as Promise<boolean>;
    await super.logIn(this.getRequest(context));
    return result;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      input: { email, password },
    } = ctx.getArgs();
    gqlReq.body.email = email.toLowerCase();
    gqlReq.body.password = password;
    return gqlReq;
  }
}