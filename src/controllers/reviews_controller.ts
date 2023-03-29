import express from 'express';

export const reviewController = express.Router();

reviewController.post('/', (req, res) => {
  res.status(201).send('')
});