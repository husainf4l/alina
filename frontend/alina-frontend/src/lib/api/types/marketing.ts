// Marketing types matching Flutter app

export enum PromotionStatus {
  Active = 'active',
  Paused = 'paused',
  Completed = 'completed',
  Scheduled = 'scheduled',
}

export enum AdPlatform {
  Google = 'google',
  Facebook = 'facebook',
  Instagram = 'instagram',
  LinkedIn = 'linkedin',
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  platform: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

export interface MarketingInsights {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  clickThroughRate: number;
  conversionRate: number;
  costPerClick: number;
  costPerConversion: number;
  returnOnAdSpend: number;
  topPerformingAds: string[];
  bestPerformingTimes: string[];
}

export interface CreatePromotionRequest {
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface CreateAdRequest {
  title: string;
  description: string;
  platform: AdPlatform;
  budget: number;
  startDate: string;
  endDate: string;
}
