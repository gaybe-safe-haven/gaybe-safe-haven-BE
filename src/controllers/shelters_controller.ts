import express from 'express';
import prisma from '../db/prisma.config';
import { Shelter } from '@prisma/client';
import { serializeShelter } from '../serializers/shelter'
export const shelterController = express.Router();

shelterController.post('/', async (req, res) => {
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
