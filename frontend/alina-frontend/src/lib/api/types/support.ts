// Support types

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  assignedToName?: string;
  responses?: TicketResponse[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export enum TicketCategory {
  Technical = 'Technical',
  Billing = 'Billing',
  Account = 'Account',
  Order = 'Order',
  General = 'General',
}

export enum TicketPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'InProgress',
  WaitingForCustomer = 'WaitingForCustomer',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  message: string;
  attachments?: string[];
  isStaffResponse: boolean;
  createdAt: string;
}

export interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  category: TicketCategory;
  priority?: TicketPriority;
}

export interface AddTicketResponseRequest {
  message: string;
  attachments?: File[];
}
