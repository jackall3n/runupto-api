import express from 'express';
import middleware from './middleware';
import routes from './routes';
import applyMiddleware from "./utils/applyMiddleware";
import applyRoutes from "./utils/applyRoutes";

process.on("uncaughtException", e => {
  console.log('uncaughtException', e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log('unhandledRejection', e);
  process.exit(1);
});

const app = express();

applyMiddleware(app, middleware);
applyRoutes(app, routes);

const { PORT = "8080", HOST = '127.0.0.1' } = process.env;

app.listen(parseInt(PORT), HOST, () => {
  console.log(`Up and running boyyy`, HOST, PORT)
});
