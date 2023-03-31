import express, { Request, Response } from 'express';
import prisma from '../db/prisma.config';
import { Shelter } from '@prisma/client';
import { serializeShelter } from '../serializers/shelter'
export const shelterController = express.Router();

shelterController.post('/', async (req: Request, res: Response) => {
  try { 
    const shelterData = req.body;
    const shelter: Shelter = await prisma.shelter.create({ data: shelterData });
    res.status(201).send({
      data: serializeShelter(shelter)
    });
  } catch (err) {
    res.status(500).send(err); 
  }
})

shelterController.get('/:shelterId', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.shelterId, 10)

  const shelter: Shelter | null = await prisma.shelter.findUnique({
    where: {
      id: id
    }
  })

  res.status(200).send({ data: serializeShelter(shelter) })
})
