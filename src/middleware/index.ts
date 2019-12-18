import express from 'express';
import cors from 'cors';

export default [
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
];
