import { PrismaClient } from "@prisma/client";
import { UserSeeder } from "./UserSeeder.js";
import { PostSeeder } from "./PostSeeder.js";
import { CommentSeeder } from "./CommentSeeder.js";

const prisma = new PrismaClient();

async function main() {
  try {
    await UserSeeder(prisma);
    await PostSeeder(prisma);
    await CommentSeeder(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
