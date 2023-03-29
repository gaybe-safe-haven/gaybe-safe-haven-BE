import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

export const reviewController = express.Router();

const prisma = new PrismaClient();

reviewController.post('/', async (req, res) => {
  // res.status(201).send('')

  let shelterId: any = req.query.shelterId;
  let cleanliness: any = req.query.cleanliness;
  let safety: any = req.query.safety;
  let staff: any = req.query.staff;

  const review = await prisma.review.create({
      data: {
        shelterId: shelterId,
        cleanliness: cleanliness,
        safety: safety,
        staff: staff,
      },
    });
});