import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Create new data
  const hashedPassword = await bcrypt.hash('12345678', 10);

  const user = await prisma.user.create({
    data: {
      email: 'sajad@me.com',
      password: hashedPassword,
      name: 'sajad',
    },
  });

  console.log('user created', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
