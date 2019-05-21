import { Prisma } from '../../../generated/prisma';

export const PrismaProvider = {
  provide: Prisma,
  useFactory: () => {
    return new Prisma({
      debug: true,
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
    });
  },
};
