import prisma from '../src/db/prisma.config';


beforeEach(async () => {
  const deleteReviews = prisma.review.deleteMany();
  const deleteShelters = prisma.shelter.deleteMany();
  await prisma.$transaction([deleteReviews, deleteShelters])
})