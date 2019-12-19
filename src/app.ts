import express from "express";
import { RedisClient } from "redis";

export interface App extends express.Application {
  locals: {
    redis: RedisClient
  }
}

export const app: App = express();

export default app;
