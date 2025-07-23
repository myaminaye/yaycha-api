import { faker } from "@faker-js/faker";

export async function PostSeeder(prisma) {
  const users = await prisma.user.findMany({ select: { id: true } });
  const userIds = users.map((u) => u.id);

  const data = [];
  for (let i = 0; i < 20; i++) {
    const content = faker.lorem.paragraph();
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    data.push({ content, userId });
  }

  console.log("Post seeding started...");
  await prisma.post.createMany({ data });
  console.log("Post seeding done.");
}
