import express from 'express';

export const shelterController = express.Router();

shelterController.post('/', (req, res) => {
  res.status(201).send('');
})
