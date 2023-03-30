import express, { Request, Response } from 'express';
import prisma from "../db/prisma.config"
import { Shelter } from "@prisma/client"
import { serializeShelter } from "../serializers/serializeShelter"

export const shelterController = express.Router();

shelterController.post('/', (req: Request, res: Response) => {
  res.status(201).send('');
})

shelterController.get('/:shelterId', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.shelterId, 10)

  const shelter: Shelter | null = await prisma.shelter.findUnique({
    where: {
      id: id
    }
  })

  res.status(200).send(serializeShelter(shelter))
})
