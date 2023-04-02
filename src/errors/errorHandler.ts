import { Prisma } from '@prisma/client';

export type SerializedError = {
  status: number
  message: string
}

export function errorHandler(err: Prisma.PrismaClientKnownRequestError): SerializedError{
  return {
    message: err.message, status: 404
  }
}
