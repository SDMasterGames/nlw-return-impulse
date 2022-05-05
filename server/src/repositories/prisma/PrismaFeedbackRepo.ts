import { prisma } from "../../prisma";
import { IFeedbackRepo, FeedbackCreateData } from "../IFeedbackRepo";

export class PrismaFeedbackRepo implements IFeedbackRepo {
  async create({
    comment,
    type,
    screenshot,
  }: FeedbackCreateData): Promise<void> {
    const feedback = await prisma.feedback.create({
      data: {
        comment,
        type,
        screenshot,
      },
    });
  }
}
