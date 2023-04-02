import express, { Request, Response } from 'express';
import { Prisma } from '@prisma/client'
import prisma from '../db/prisma.config';
import { Shelter, ShelterWithRating } from '../shelter/shelter.types';
import { serializeShelter } from '../serializers/shelter'
import { errorHandler, SerializedError } from '../errors/errorHandler'
import { addRatings } from '../shelter/shelter.service'
export const shelterController = express.Router();

shelterController.post('/', async (req: Request, res: Response) => {
  try { 
    const shelterData = req.body;
    const shelter: Shelter = await prisma.shelter.create({ data: shelterData });
    const shelterWithRating: ShelterWithRating = await addRatings(shelter)
    res.status(201).send({
      data: serializeShelter(shelterWithRating)
    });
  } catch (err) {
    res.status(500).send(err); 
  }
})

shelterController.get('/:shelterId', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.shelterId, 10)

  try{
    const shelter: Shelter = await prisma.shelter.findUniqueOrThrow({
      where: {
        id: id
      }
    })

    const shelterWithRating: ShelterWithRating = await addRatings(shelter)
    res.status(200).send({ data: serializeShelter(shelterWithRating) })
  } catch (err) {
    if(err instanceof Prisma.PrismaClientKnownRequestError){
      const serializedError: SerializedError = errorHandler(err)
      res.status(serializedError.status).send(serializedError)
    }
    throw err
  }
})
