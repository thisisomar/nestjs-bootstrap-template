import { Field, InputType } from "@nestjs/graphql";
import { IsString, Min, MinLength } from "class-validator";

@InputType()
export class SignupUserInput {
  @IsString()
  @Field()
  firstName!: string;

  @IsString()
  @Field()
  lastName!: string;

  @IsString()
  @Field()
  email!: string;

  @MinLength(6)
  @Field()
  password!: string;
}