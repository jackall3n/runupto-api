import middleware from './middleware';
import routes from './routes';
import applyMiddleware from "./utils/applyMiddleware";
import applyRoutes from "./utils/applyRoutes";
import app from "./app";
import { connect } from "./redis";

process.on("uncaughtException", e => {
  console.error('uncaughtException', e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.error('unhandledRejection', e);
  process.exit(1);
});

applyMiddleware(app, middleware);
applyRoutes(app, routes);

const { PORT = "8080", HOST = '127.0.0.1', REDIS_URL } = process.env;

app.listen(parseInt(PORT), HOST, () => {
  console.log('Server started with configurations:', {
    PORT,
    HOST,
    REDIS_URL
  });

  connect(app);
});
