import prisma from '../src/db/prisma.config'
import csv from 'csv-parser'
import fs from 'fs'

type ShelterData = {
  name: string
  streetAddress: string
  city: string
  state: string
  zip: string
  websiteUrl?: string
  phoneNumber?: string
  verified: boolean
}

async function main() {
  console.log('Parsing CSV...')
  //parse csv to array of shelterobjects
  const shelterSeedData: ShelterData[] = [];
  fs.createReadStream('prisma/seedData.csv')
  .pipe(csv())
  .on('data', (data) => shelterSeedData.push({...data, verified: true}))
  .on('end', async() => {
    await prisma.shelter.createMany({ data: shelterSeedData })
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



