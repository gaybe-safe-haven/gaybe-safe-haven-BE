import { Response } from 'express'
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod'

export function errorHandler(err: any, res: Response) {
  if (err instanceof ZodError) {
    res.status(400).send({ errors: err.issues })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(404).send({ error: err.message })
  } else {
    res.status(500).send({ error: 'Internal server error' })
  }
}
