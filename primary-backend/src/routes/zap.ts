import Router from "express";
import { authMiddleware } from "../authMiddleware";
import { zapCreateSchema } from "../types";
import { prismaClient } from "../db";
const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = zapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        triggerId: "",
        actions: {
          create: parsedData.data?.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data?.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
  });
});

router.get("/", authMiddleware, (req, res) => {
  res.send("hello from zap router");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  res.send("hello from zap router");
});

export const zapRouter = router;
