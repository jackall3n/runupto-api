import dotEnv from 'dotenv';

dotEnv.config();

const { PORT = '7000', REDIS_URL = 'redis://142.93.33.162:6379', PROD_REDIS_URL, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;

const env = {
  port: Number(PORT),
  redis_url: PROD_REDIS_URL || REDIS_URL,
  strava_client_id: STRAVA_CLIENT_ID,
  strava_client_secret: STRAVA_CLIENT_SECRET
};

console.log('env', env);

export default env;
