import express from 'express';
import prisma from '../db/prisma.config';
import { Review } from '@prisma/client';
import { serializeReview } from '../serializers/review';

export const reviewController = express.Router();

reviewController.post('/', async (req, res) => {
try {
  const reviewData = req.body;
  const review: Review = await prisma.review.create({ data: reviewData });
    res.status(201).send({
      data: serializeReview(review)
    });

  }
  catch(err) {
    res.status(500).send(err);
  }
});