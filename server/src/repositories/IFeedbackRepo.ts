export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IFeedbackRepo {
  create(data: FeedbackCreateData): Promise<void>;
}
