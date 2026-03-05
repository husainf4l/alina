// Favorites and Wishlist types

export interface Favorite {
  id: string;
  userId: string;
  gigId: string;
  gig?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    sellerName: string;
    sellerAvatar?: string;
    rating: number;
  };
  createdAt: string;
}

export interface AddFavoriteRequest {
  gigId: string;
}

export interface RecentlyViewed {
  id: string;
  userId: string;
  gigId: string;
  gig?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    sellerName: string;
    rating: number;
  };
  viewedAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  query: string;
  filters: Record<string, any>;
  createdAt: string;
}
