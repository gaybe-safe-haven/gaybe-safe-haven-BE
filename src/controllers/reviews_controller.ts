import express from 'express';
import prisma from '../db/prisma.config';

export const reviewController = express.Router();

reviewController.post('/', async (req, res) => {

  let shelterId: number = req.body.shelterId;
  let cleanliness: number = req.body.cleanliness;
  let safety: number = req.body.safety;
  let staff: number = req.body.staff;

  const review = await prisma.review.create({
      data: {
        shelterId: shelterId,
        cleanliness: cleanliness,
        safety: safety,
        staff: staff,
      },
    });
    res.status(204).send();
});