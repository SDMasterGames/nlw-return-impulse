import { submitFeedback } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const SubmitFeedback = new submitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit Feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      SubmitFeedback.execute({
        comment: "test",
        type: "BUG",
        screenshot: "data:image/png;base64,12931u0293u10293",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      SubmitFeedback.execute({
        comment: "",
        type: "BUG",
        screenshot: "data:image/png;base64,12931u0293u10293",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit feedback without type", async () => {
    await expect(
      SubmitFeedback.execute({
        comment: "pao",
        type: "",
        screenshot: "data:image/png;base64,12931u0293u10293",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without an invalid screenshot ", async () => {
    await expect(
      SubmitFeedback.execute({
        comment: "pao",
        type: "pao",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
