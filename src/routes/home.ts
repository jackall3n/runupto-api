import express from 'express';

const home = express.Router();

home.get('/', (req, res) => {
  res.send('what?')
});

export default home;
