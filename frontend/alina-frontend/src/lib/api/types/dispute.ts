// Dispute types

export interface Dispute {
  id: string;
  orderId: string;
  openedBy: string;
  openedByName: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  resolution?: string;
  resolvedBy?: string;
  createdAt: string;
  resolvedAt?: string;
  updatedAt: string;
}

export enum DisputeStatus {
  Open = 'Open',
  UnderReview = 'UnderReview',
  ResolvedBuyerFavor = 'ResolvedBuyerFavor',
  ResolvedSellerFavor = 'ResolvedSellerFavor',
  Closed = 'Closed',
}

export interface CreateDisputeRequest {
  orderId: string;
  reason: string;
  description: string;
}

export interface ResolveDisputeRequest {
  resolution: string;
  outcome: 'BuyerFavor' | 'SellerFavor';
}
