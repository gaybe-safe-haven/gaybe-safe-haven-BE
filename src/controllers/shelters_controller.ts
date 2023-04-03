import express, { Request, Response } from 'express';
import prisma from '../db/prisma.config';
import { Shelter, ShelterWithRating } from '../shelter/shelter.types';
import { serializeShelter } from '../serializers/shelter'
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
    res.status(404).send(err)
  }
})

shelterController.get('/', async (req: Request, res: Response) => {
  try {
    const shelters: Shelter[] = await prisma.shelter.findMany();
    const sheltersWithRating: ShelterWithRating[] = await Promise.all(
      shelters.map((shelter) => addRatings(shelter))
    );
    const serializedShelters: any[] = sheltersWithRating.map((shelter) =>
      serializeShelter(shelter)
    );
    res.status(200).send({ data: serializedShelters });
  } catch (err) {
    res.status(404).send(err);
  }
});
