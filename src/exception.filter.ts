import { ArgumentsHost, Catch, ContextType, ExceptionFilter, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { BaseException } from "exceptions/base.exception";
import { GraphQLError } from "graphql";

@Catch(BaseException)
export class GlobalExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  // catch both GQL and REST errors
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (gqlHost.getType<'graphql' | ContextType>() === 'graphql') {
      // handle GQL errors
      return new GraphQLError(exception.message, { extensions: { code: exception.code } });
    } else {
      // handle REST errors
      return new HttpException({
        status: 400,
        error: exception.getErrorCode(),
        message: exception.message,
      }, 400);
    }
  }
}