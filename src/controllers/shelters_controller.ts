import express, { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma.config';
import { Shelter, ShelterWithRating, shelterValidators } from '../shelter/shelter.types';
import { serializeShelter } from '../serializers/shelter'
import { errorHandler } from '../errors/errorHandler'
import { addRatings } from '../shelter/shelter.service'
import { Serialized } from '../serializers/serializer.types'

export const shelterController = express.Router();

shelterController.post('/', async (req: Request, res: Response) => {
  try { 
    const shelterData = shelterValidators.postData.parse(req.body) 
    const shelter: Shelter = await prisma.shelter.create({ data: shelterData });
    const shelterWithRating: ShelterWithRating = await addRatings(shelter)
    res.status(201).send({
      data: serializeShelter(shelterWithRating)
    });
  } catch (err) {
    errorHandler(err, res)
  }
})

shelterController.get('/:shelterId', async (req: Request, res: Response) => {
  try {
    const id = shelterValidators.shelterId.parse(req.params.shelterId)

    const shelter: Shelter = await prisma.shelter.findUniqueOrThrow({
      where: {
        id: id
      }
    })
    const shelterWithRating: ShelterWithRating = await addRatings(shelter)
    res.status(200).send({ data: serializeShelter(shelterWithRating) })
  } catch (err) {
    errorHandler(err, res)
  }
})

shelterController.get('/', async (req: Request, res: Response) => {
  try {
    const shelters: Shelter[] = await prisma.shelter.findMany();
    const sheltersWithRating: ShelterWithRating[] = await Promise.all(
      shelters.map((shelter) => addRatings(shelter))
    );
    const serializedShelters: Serialized<ShelterWithRating>[] = sheltersWithRating.map((shelter) =>
      serializeShelter(shelter)
    );
    res.status(200).send({ data: serializedShelters });
  } catch (err) {
    errorHandler(err, res);
  }
});
