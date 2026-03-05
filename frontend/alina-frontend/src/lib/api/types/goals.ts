// Goal types matching Flutter app

export enum GoalType {
  Revenue = 'revenue',
  Orders = 'orders',
  Rating = 'rating',
  ResponseTime = 'responseTime',
  CompletionRate = 'completionRate',
}

export enum GoalPeriod {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly',
}

export enum GoalStatus {
  Active = 'active',
  Completed = 'completed',
  Expired = 'expired',
  Paused = 'paused',
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  type: GoalType;
  period: GoalPeriod;
  targetValue: number;
  currentValue: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  status: GoalStatus;
  isAchieved: boolean;
  achievedAt?: string;
  achievementBadge?: string;
}

export interface CreateGoalRequest {
  title: string;
  description: string;
  type: GoalType;
  period: GoalPeriod;
  targetValue: number;
  endDate: string;
}

export interface UpdateGoalRequest {
  title: string;
  description: string;
  targetValue: number;
  endDate: string;
  status: GoalStatus;
}

export interface ProgressEntry {
  date: string;
  value: number;
  description: string;
}

export interface GoalProgress {
  goalId: string;
  currentValue: number;
  progressPercentage: number;
  isAchieved: boolean;
  achievedAt?: string;
  achievementBadge?: string;
  recentProgress: ProgressEntry[];
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: string;
}
