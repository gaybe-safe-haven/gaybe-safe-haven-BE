import express from 'express';
import prisma from '../db/prisma.config';
import { Review } from '@prisma/client';
import { serializeReview } from '../serializers/review';
import { errorHandler } from '../errors/errorHandler'
import { reviewPostValidator, ReviewPost } from '../../src/reviews/review.types';

export const reviewController = express.Router();

reviewController.post('/', async (req, res) => {
try {
  const reviewData: ReviewPost = reviewPostValidator.parse(req.body);
  const review: Review = await prisma.review.create({ data: reviewData });
    res.status(201).send({
      data: serializeReview(review)
    });
  }
  catch(err) {
    errorHandler(err, res)
  }
});