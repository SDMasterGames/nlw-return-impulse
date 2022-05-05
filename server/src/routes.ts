import express from "express";
import { MailAdapter } from "./adapters/nodemailer/MailAdapter";

import { submitFeedback } from "./modules/submitFeedback";

import { PrismaFeedbackRepo } from "./repositories/prisma/PrismaFeedbackRepo";

export const router = express.Router();

router.post("/feedback", async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const submitFeedbackUseCase = new submitFeedback(
    new PrismaFeedbackRepo(),
    new MailAdapter()
  );

  await submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot,
  });

  return res.status(201).send();
});
