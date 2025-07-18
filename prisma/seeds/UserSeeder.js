import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export async function UserSeeder(prisma) {
  const password = await bcrypt.hash("password", 10);
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const username = faker.internet.userName();
    const bio = faker.person.bio();

    await prisma.user.upsert({
      where: { username },
      update: {},
      create: { name, username, bio, password },
    });
  }
  console.log("✅ User seeding done.");
}
