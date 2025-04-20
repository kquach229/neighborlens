// types.ts

export enum CreditReason {
  PURCHASE = 'PURCHASE',
  REVIEW_REWARD = 'REVIEW_REWARD',
  MANUAL_ADJUSTMENT = 'MANUAL_ADJUSTMENT',
  REDEMPTION = 'REDEMPTION',
}

export enum CreditType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export type User = {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  credits: number;
  ideas?: Idea[];
  reviews?: Review[];
  creditEvents?: CreditHistory[];
  purchases?: Purchase[];
};

export type Idea = {
  id: string;
  title: string;
  briefDescription: string;
  problemItSolves: string;
  authorId: string;
  categories: string[];
  pricingModel: string;
  pricingDetails: string;
  updatedAt: Date;
  createdAt: Date;
  author?: User;
  reviews?: Review[];
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  whatILike: string;
  whatIDislike: string;
  wouldIPayForThis: string;
  suggestions: string;
  ideaId: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
  idea?: Idea;
  user?: User;
};

export type CreditHistory = {
  id: string;
  userId: string;
  amount: number;
  type: CreditType;
  reason: CreditReason;
  metadata?: string | null;
  createdAt: Date;
  user?: User;
};

export type Purchase = {
  id: string;
  userId: string;
  stripeSessionId: string;
  amountPaid: number;
  creditsGranted: number;
  createdAt: Date;
  user?: User;
};
