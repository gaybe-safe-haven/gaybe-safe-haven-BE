import prisma from '../src/db/prisma.config';


beforeEach(() => {
  const deleteReviews = prisma.review.deleteMany();
  const deleteShelters = prisma.shelter.deleteMany();
  prisma.$transaction([deleteReviews, deleteShelters])
})