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

async function avgCleanRating(shelterId: number): Promise<string | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        shelterId: shelterId
      },
      _avg: {
        cleanliness: true
      }
    })
  if(_avg.cleanliness){
    return _avg.cleanliness.toFixed(1)
  } else {
    return null
  }
} 

async function avgStaffRating(shelterId: number): Promise<string | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        shelterId: shelterId
      },
      _avg: {
        staff: true
      }
    })
  if(_avg.staff){
    return _avg.staff.toFixed(1)
  } else {
    return null
  }
} 

async function avgSafetyRating(shelterId: number): Promise<string | null>{
    const {_avg } = await prisma.review.aggregate({
      where: {
        shelterId: shelterId
      },
      _avg: {
        safety: true
      }
    })
  if(_avg.safety){
    return _avg.safety.toFixed(1)
  } else {
    return null
  }
} 
