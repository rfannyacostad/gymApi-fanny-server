import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhoneCodeResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

