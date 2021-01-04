import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { PostResolver } from "./resolvers/postResolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

async function bootstrap() {
  const connection = await createConnection();
  const schema = await buildSchema({ resolvers: [PostResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");
}

bootstrap();
