import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

export const reviewController = express.Router();

const prisma = new PrismaClient();

reviewController.post('/', async (req, res) => {

  let shelterId: any = req.body.shelterId;
  let cleanliness: any = req.body.cleanliness;
  let safety: any = req.body.safety;
  let staff: any = req.body.staff;

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