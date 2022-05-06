import { IMailAdapter } from "../adapters/IMailAdapter";
import { IFeedbackRepo } from "../repositories/IFeedbackRepo";

interface SubmitFeedbackRequestDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export class submitFeedback {
  constructor(
    private IFeedbackRepo: IFeedbackRepo,
    private IMailAdapter: IMailAdapter
  ) {}
  async execute(data: SubmitFeedbackRequestDTO) {
    const { comment, type, screenshot } = data;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot must be a base64 encoded image");
    }

    if(!comment || !type){
      throw new Error("Fields are required");
    }

    await this.IFeedbackRepo.create({
      comment,
      type,
      screenshot,
    });

    await this.IMailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family:sans-serif; font-size:16px; color:#111;" >`,
        `<p>Tipo do feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : "",
        "</div>",
      ].join("\n"),
    });
  }
}
