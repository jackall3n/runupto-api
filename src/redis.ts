import redis from "redis";

import { App } from './app';

const { REDIS_URL = 'redis://127.0.0.1:6379' } = process.env;

export const connect = (app: App) => {
  try {
    const client = app.locals.redis = redis.createClient(REDIS_URL);

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
