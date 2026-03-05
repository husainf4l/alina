// Notification types

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export enum NotificationType {
  OrderPlaced = 'OrderPlaced',
  OrderDelivered = 'OrderDelivered',
  OrderCompleted = 'OrderCompleted',
  OrderCancelled = 'OrderCancelled',
  OrderDisputed = 'OrderDisputed',
  RevisionRequested = 'RevisionRequested',
  NewMessage = 'NewMessage',
  CustomOfferReceived = 'CustomOfferReceived',
  ReviewReceived = 'ReviewReceived',
  PaymentReceived = 'PaymentReceived',
  WithdrawalProcessed = 'WithdrawalProcessed',
  System = 'System',
}

export interface UserNotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  messageNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

export interface UpdateNotificationSettingsRequest extends Partial<Omit<UserNotificationSettings, 'userId'>> {}

export interface MarkNotificationReadRequest {
  notificationIds: string[];
}
