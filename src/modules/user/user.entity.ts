import { Entity, Property, Unique } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { Base } from "../../utils/base.entity";

@ObjectType()
@Entity()
export class User extends Base<User> {
  @Property()
  @Field()
  firstName!: string;

  @Property()
  @Field()
  lastName!: string;

  @Property()
  @Field()
  @Unique()
  email!: String;

  @Property()
  password!: string;

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}