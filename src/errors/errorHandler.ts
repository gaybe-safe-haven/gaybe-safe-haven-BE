import { Response } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export function errorHandler(err: any, res: Response) {
  if (err instanceof ZodError) {
    res.status(400).send({ errors: serializeZodError(err) })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const error = serializePrismaError(err)
    res.status(error.error.status).send(error)
  } else {
    res.status(500).send({ error: { status: 500, message: 'Internal server error' }})
  }
}

function serializeZodError(errors: ZodError) {
  return errors.issues.map((error) => {
    return { ...error, field: error.path[0] }
  })
}

function serializePrismaError(error: Prisma.PrismaClientKnownRequestError){
  switch(error.code){
    case 'P2002':
      return { error: { status: 422, code: error.code, message: "Unique constraint failed. Shelter already exists at this location"}} 
    case 'P2003':
      return {error: { status: 422, code: error.code, message: "Foreign Key constraint failed. Attempted to rate shelter that does not exist"}}
    case 'P2025':
      return { error: { status: 404, code: error.code, message: "Resource not found"}} 
    default:
      return { error: { status: 400, code: error.code, message: error.message}}
  }
}
