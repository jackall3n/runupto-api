import express from 'express';
import client from "../redis";

const subscription = express.Router();

const SUBSCRIPTION_KEY = "subscription:update";

subscription.get('/queue', (req, res) => {
  try {
    client.hgetall(SUBSCRIPTION_KEY, (e, subscriptions) => {
      res.send(subscriptions)
    });
  } catch (e) {
    res.send(e.message);
  }
});

subscription.post('/subscription', (req, res) => {
  const { subscription_id } = req.body;

  client.hset(SUBSCRIPTION_KEY, subscription_id, JSON.stringify(req.body), (error) => {
    res.status(error !== null ? 500 : 200).send();
  });
});

export default subscription;
