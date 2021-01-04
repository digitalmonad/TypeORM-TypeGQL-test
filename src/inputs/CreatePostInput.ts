import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  author: string;
}
