import { Goal } from '../models/types';

export interface IGoalRepo {
  create(goal: Omit<Goal, 'id' | 'createdAt' | 'achievedAt'>): Promise<Goal>;
  listByUser(userId: string): Promise<Goal[]>;
  markAchieved(goalId: string, timestamp?: string): Promise<void>;
}
