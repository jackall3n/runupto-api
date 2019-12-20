import express from 'express';
import { App } from "../app";

const events = express.Router();

const STRAVA_EVENTS_KEY = "strava:events:queued";
// const STRAVA_QUEUED_EVENTS_KEY = "strava:events:processing";

events.get('/queue', (req, res) => {
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

export default events;
