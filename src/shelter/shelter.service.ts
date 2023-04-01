import { Shelter } from '@prisma/client'
import prisma from '../db/prisma.config'


export type ShelterWithRating = Omit<Shelter, "updatedAt" | "createdAt"> & {
  avgClean: number | null;
  avgSafety: number | null;
  avgStaff: number | null;
}

export async function addRatings(shelterData: Shelter): Promise<ShelterWithRating>{
  const avgClean = await avgCleanRating(shelterData.id)
  const avgSafety = await avgSafetyRating(shelterData.id)
  const avgStaff = await avgStaffRating(shelterData.id)

  return {
    ...shelterData,
    avgClean,
    avgSafety,
    avgStaff
  }
}

async function avgCleanRating(shelterId: number): Promise<number | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        id: shelterId
      },
      _avg: {
        cleanliness: true
      }
    })
  return _avg.cleanliness
} 

async function avgStaffRating(shelterId: number): Promise<number | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        id: shelterId
      },
      _avg: {
        staff: true
      }
    })
  return _avg.staff
} 

async function avgSafetyRating(shelterId: number): Promise<number | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        id: shelterId
      },
      _avg: {
        safety: true
      }
    })
  return _avg.safety
} 
