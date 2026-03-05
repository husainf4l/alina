// Marketplace types

export interface Gig {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerRating?: number;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subCategories?: string[];
  tags?: string[];
  images?: string[];
  mainImage?: string;
  videoUrl?: string;
  packages: Package[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  totalOrders: number;
  startingPrice?: number;
  deliveryTimeInDays?: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  gigId: string;
  name: PackageType;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
  isActive: boolean;
}

export enum PackageType {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium',
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  gigCount: number;
}

export interface Review {
  id: string;
  gigId: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  rating: number;
  comment: string;
  sellerResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  gigId: string;
  createdAt: string;
}

export interface CustomOffer {
  id: string;
  sellerId: string;
  buyerId: string;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  status: CustomOfferStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export enum CustomOfferStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Declined = 'Declined',
  Expired = 'Expired',
  Cancelled = 'Cancelled',
}

export interface CreateGigRequest {
  title: string;
  description: string;
  categoryId: string;
  subCategories?: string[];
  tags?: string[];
  packages: Omit<Package, 'id' | 'gigId' | 'isActive'>[];
}

export interface UpdateGigRequest extends Partial<CreateGigRequest> {
  isActive?: boolean;
}

export interface SearchGigsRequest {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  deliveryDays?: number;
  rating?: number;
  sortBy?: 'relevance' | 'price' | 'rating' | 'newest';
  page?: number;
  pageSize?: number;
}

export interface UserTask {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}
