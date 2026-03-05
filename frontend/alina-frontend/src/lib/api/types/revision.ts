// Revision Request types

export enum RevisionStatus {
  REQUESTED = 'Requested',
  IN_PROGRESS = 'InProgress',
  SUBMITTED = 'Submitted',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
}

export interface Revision {
  id: string;
  orderId: string;
  requestedBy: string;
  requestedByName?: string;
  description: string;
  status: RevisionStatus;
  attachments?: string[];
  submittedAt?: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRevisionRequest {
  orderId: string;
  description: string;
  attachments?: File[];
}

export interface SubmitRevisionRequest {
  revisionId: string;
  description?: string;
  attachments?: File[];
}
