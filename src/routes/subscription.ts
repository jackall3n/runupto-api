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
  const { subscription_id } = req.body;

  redis.hset(SUBSCRIPTION_KEY, subscription_id, JSON.stringify(req.body), (error) => {
    res.status(error !== null ? 500 : 200).send();
  });
});

export default subscription;
