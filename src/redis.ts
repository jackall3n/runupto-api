import redis from "redis";

import { App } from './app';
import env from "./constants/env";

export const connect = (app: App) => {
  try {
    const client = app.locals.redis = redis.createClient(env.redis_url);

    client.on('connect', () => {
      console.log('connected to redis')
    });

    client.on('error', (error) => {
      console.log('redis on error', error);
    });
  } catch (e) {
    console.error('redis error', e);
  }
};
