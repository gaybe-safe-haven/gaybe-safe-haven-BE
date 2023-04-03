import { Shelter, ShelterWithRating } from './shelter.types'
import prisma from '../db/prisma.config'


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
        shelterId: shelterId
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
        shelterId: shelterId
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
        shelterId: shelterId
      },
      _avg: {
        safety: true
      }
    })
  return _avg.safety
} 
