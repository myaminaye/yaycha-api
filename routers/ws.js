import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secret = process.env.JWT_SECRET;
let clients = [];

// Export the router
export const wsRouter = router;

// Export the init function to apply WebSocket support and define routes
export function initWsRouter(wsInstance) {
  wsInstance.applyTo(router); // Adds .ws() to router

  // ✅ Now it's safe to define .ws() routes
  router.ws("/subscribe", (ws, req) => {
    console.log("WS: New connection");

    ws.on("message", (msg) => {
      try {
        const { token } = JSON.parse(msg);
        jwt.verify(token, secret, (err, user) => {
          if (err) return;
          clients.push({ userId: user.id, ws });
          console.log(`WS: Client added: ${user.id}`);
        });
      } catch (err) {
        console.error("Invalid message format", err);
      }
    });

    ws.on("close", () => {
      clients = clients.filter((c) => c.ws !== ws);
      console.log("WS: Client disconnected");
    });
  });
}
