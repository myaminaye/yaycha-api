import express from "express";
import cors from "cors";
import { prisma } from "./PrismaClient.js";
import { contentRouter } from "./routers/content.js";

const app = express();
app.use(cors());

app.use("/content", contentRouter);

// app.get("/info", (req, res) => {
//   res.json({ msg: "Yaycha API" });
// });

const server = app.listen(8000, () => {
  console.log("Yaycha API started at 8000...");
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Yaycha API closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
