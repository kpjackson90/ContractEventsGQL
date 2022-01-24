import express from 'express';
import { json } from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { errorHandler } from './middlewares';
import { schema } from './graphql/schema';

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(errorHandler);

export { app };
