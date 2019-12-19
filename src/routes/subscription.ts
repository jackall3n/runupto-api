import express from 'express';
import { App } from "../app";

const subscription = express.Router();

const STRAVA_EVENTS_KEY = "strava:events";

subscription.get('/queue', (req, res) => {
  const { redis } = req.app.locals as App['locals'];

  try {
    redis.lrange(STRAVA_EVENTS_KEY, 0, -1, (e, events) => {

      const updates = events.map((p: string) => JSON.parse(p)) as any[];

      res.send(updates)
    });
  } catch (e) {
    res.send(e.message);
  }
});

subscription.post('/callback', (req, res) => {
  const { redis } = req.app.locals as App['locals'];

  redis.rpush(STRAVA_EVENTS_KEY, JSON.stringify(req.body), (error) => {
    res.status(error !== null ? 500 : 200).send();
  });
});

subscription.get('/callback', (req, res) => {
  const challenge = req.query['hub.challenge'];
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];

  console.log('subscription', { challenge, mode, token });

  res.json({
    'hub.challenge': challenge
  })
});

export default subscription;
