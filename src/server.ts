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

const { PORT = "8080", REDIS_URL } = process.env;

const port = parseInt(PORT);

app.listen(port, () => {
  console.log('Server started with configurations:', {
    port,
    REDIS_URL
  });

  connect(app);
});
