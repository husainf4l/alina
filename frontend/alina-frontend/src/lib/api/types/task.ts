// Task Management types (buyer-posted jobs)

export enum TaskStatus {
  DRAFT = 'Draft',
  OPEN = 'Open',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum BidStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  WITHDRAWN = 'Withdrawn',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  duration: number; // in days
  skillsRequired: string[];
  attachments: string[];
  status: TaskStatus;
  buyerId: string;
  buyerName?: string;
  buyerAvatar?: string;
  bidsCount: number;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
}

export interface Bid {
  id: string;
  taskId: string;
  sellerId: string;
  sellerName?: string;
  sellerAvatar?: string;
  sellerRating?: number;
  amount: number;
  proposedDuration: number;
  coverLetter: string;
  status: BidStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  categoryId: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  duration: number;
  skillsRequired: string[];
  attachments?: string[];
  deadline?: string;
}

export interface SubmitBidRequest {
  taskId: string;
  amount: number;
  proposedDuration: number;
  coverLetter: string;
}
