import redis from "redis";

const { REDIS_URL = 'redis://127.0.0.1:6379' } = process.env;
const client = redis.createClient(REDIS_URL);

export const connect = () => {
  client.on('connect', () => {
    console.log('connected to redis')
  });

  client.on('error', (error) => {
    console.log(error);
  });
};

export default client;
