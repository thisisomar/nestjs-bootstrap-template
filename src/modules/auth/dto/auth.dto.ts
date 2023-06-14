import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class LoginUserDto {
  @IsEmail()
  @Field()
  email: string;

  @Min(6)
  @Field()
  password: string;
}

@InputType()
export class SignUpUserInput {
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