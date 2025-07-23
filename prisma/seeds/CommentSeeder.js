import { faker } from "@faker-js/faker";

export async function CommentSeeder(prisma) {
  const users = await prisma.user.findMany({ select: { id: true } });
  const posts = await prisma.post.findMany({ select: { id: true } });

  if (users.length === 0 || posts.length === 0) {
    throw new Error("No users or posts available to seed comments.");
  }

  const data = [];

  for (let i = 0; i < 40; i++) {
    data.push({
      content: faker.lorem.paragraph(),
      userId: users[Math.floor(Math.random() * users.length)].id,
      postId: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  console.log("Comment seeding started...");
  await prisma.comment.createMany({ data });
  console.log("✅ Comment seeding done.");
}
