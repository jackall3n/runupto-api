import express from 'express';
import { App } from "../app";

const subscription = express.Router();

const SUBSCRIPTION_KEY = "subscription:update";

subscription.get('/queue', (req, res) => {
  const { redis } = req.app.locals as App['locals'];

  try {
    redis.hgetall(SUBSCRIPTION_KEY, (e, subscriptions) => {
      res.send(subscriptions)
    });
  } catch (e) {
    res.send(e.message);
  }
});

subscription.post('/subscription', (req, res) => {
  const { redis } = req.app.locals as App['locals'];
  const { event_time } = req.body;

  redis.hset(SUBSCRIPTION_KEY, event_time, JSON.stringify(req.body), (error) => {
    res.status(error !== null ? 500 : 200).send();
  });
});

export default subscription;
