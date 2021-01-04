import { Query, Mutation, Resolver, Arg } from "type-graphql";

import { Post } from "../entities/Post";
import { CreatePostInput } from "../inputs/CreatePostInput";
import { UpdatePostInput } from "../inputs/UpdatePostInput";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return Post.find();
  }

  @Query(() => Post)
  post(@Arg("id") id: string) {
    return Post.findOne({ where: { id } });
  }

  @Mutation(() => Post)
  async createPost(@Arg("data") data: CreatePostInput) {
    const post = Post.create(data);
    await post.save();
    return post;
  }

  @Mutation(() => Post)
  async updatePost(@Arg("id") id: string, @Arg("data") data: UpdatePostInput) {
    const post = await Post.findOne({ where: { id } });
    if (!post) throw new Error("Post not found!");
    Object.assign(post, data);
    await post.save();
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string) {
    const post = await Post.findOne({ where: { id } });
    if (!post) throw new Error("Post not found!");
    await post.remove();
    return true;
  }
}
