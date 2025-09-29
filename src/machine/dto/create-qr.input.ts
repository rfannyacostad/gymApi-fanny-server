import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQrInput {
  @Field()
  @IsNotEmpty()
  code: string;
}
