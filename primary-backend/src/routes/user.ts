import Router from "express";
import { authMiddleware } from "../authMiddleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.email,
      // TODO: Dont store passwords in plaintext, hash it
      password: parsedData.data.password,
    },
  });

  // sendEmail() to verify

  res.send({
    message: "Success, Please verify your email",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Incorrect Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  res.json({
    user,
  });
});

export const userRouter = router;
