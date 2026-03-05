// Order types

export interface FileAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string; // MIME type
  fileSize: number; // in bytes
  uploadedBy: string;
  uploadedAt: string;
}

export interface Order {
  id: string;
  gigId?: string;
  gigTitle: string;
  gigImage?: string;
  packageId?: string;
  packageName?: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  price: number;
  deliveryDays?: number;
  revisions?: number;
  usedRevisions?: number;
  status: OrderStatus;
  requirements?: OrderRequirement[];
  deliverables?: OrderDeliverable[];
  customOfferIdSometimes?: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  deadline?: string;
  completedAt?: string;
  // Flutter MarketplaceOrderDto fields
  commissionAmount?: number;
  platformFeePercentage?: number;
  sellerReceives?: number;
  deliveryMessage?: string;
  attachments?: FileAttachment[];
}

export enum OrderStatus {
  Pending = 'Pending',
  RequirementsSubmitted = 'RequirementsSubmitted',
  InProgress = 'InProgress',
  Delivered = 'Delivered',
  Revision = 'Revision',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Disputed = 'Disputed',
}

export interface OrderRequirement {
  id: string;
  orderId: string;
  question: string;
  answer: string;
  type: RequirementType;
}

export enum RequirementType {
  Text = 'Text',
  File = 'File',
  MultipleChoice = 'MultipleChoice',
}

export interface OrderDeliverable {
  id: string;
  orderId: string;
  message: string;
  attachments?: string[];
  createdAt: string;
}

export interface Revision {
  id: string;
  orderId: string;
  requestedBy: string;
  reason: string;
  status: RevisionStatus;
  createdAt: string;
  completedAt?: string;
}

export enum RevisionStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export interface CreateOrderRequest {
  gigId: string;
  packageId: string;
  customOfferId?: string;
}

export interface SubmitRequirementsRequest {
  requirements: Array<{
    questionId: string;
    answer: string;
  }>;
}

export interface DeliverOrderRequest {
  message: string;
  attachments?: File[];
}

export interface RequestRevisionRequest {
  reason: string;
}
