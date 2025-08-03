import { PrismaClient } from '@prisma/client';
const globalForPrisma = globalThis;
// Check to see if there is an instance of prisma, otherwise create a new one.
// Ensures that only one instance is running at a time. Improves performance.
const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
export default prisma;
