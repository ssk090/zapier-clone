import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const PORT = 3000;

const client = new PrismaClient();

// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;
  console.log(userId, zapId);

  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    message: "Webhook received!",
  });
});

app.listen(3000, () => {
  console.log("App Running on Port:: ", PORT);
});
